// Mock data layer for RetailBrain.
// Shapes mirror the future MongoDB collections (users, predictions, modelMetrics)
// so swapping in real API responses later requires no shape changes here.

export const CITIES = ['Chennai', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad'];

export const PAYMENT_METHODS = ['UPI', 'Credit Card', 'Debit Card', 'Cash on Delivery', 'Net Banking'];

export const PRODUCT_CATEGORIES = [
  'Electronics', 'Apparel', 'Home & Kitchen', 'Beauty & Personal Care',
  'Grocery', 'Footwear', 'Furniture', 'Sports & Fitness',
];

export const SHIPPING_METHODS = ['Standard', 'Express', 'Same Day', 'Store Pickup'];

export const CUSTOMER_SEGMENTS = ['New', 'Regular', 'Loyal', 'At Risk', 'VIP'];

// -----------------------------
// Prediction form configuration
// -----------------------------
// Kept data-driven so this can evolve without touching UI code. The final
// Random Forest model's 19 features (historical view/cart/transaction
// counts, etc.) are internal model inputs derived server-side from a
// customer/item pair — they are NOT collected here. This form only collects
// the two identifiers needed to identify which customer/product to predict
// for; see backend/src/services/mlService.js for the feature derivation
// contract.
export const PREDICTION_FORM_CONFIG = [
  {
    section: 'Customer & Product Selection',
    fields: [
      { name: 'customerId', label: 'Customer ID', type: 'text', placeholder: 'CUST-10234', required: true },
      { name: 'itemId', label: 'Product / Item ID', type: 'text', placeholder: 'ITEM-48213', required: true },
    ],
  },
];

// -----------------------------
// Mock authenticated user
// -----------------------------
export const MOCK_USER = {
  _id: 'usr_10293',
  name: 'Kalai Arasan',
  email: 'kalai.arasan@retailbrain.app',
  createdAt: '2025-11-04T09:12:00.000Z',
};

// -----------------------------
// Prediction outcome helpers
// -----------------------------
export const PREDICTION_LABELS = ['Likely to Purchase', 'Unlikely to Purchase'];

export const ACTUAL_OUTCOME_OPTIONS = ['Purchased', 'Did Not Purchase', 'Not Known Yet'];

function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

const rand = seededRandom(42);

const CUSTOMER_NAMES = [
  'Aarav Mehta', 'Diya Krishnan', 'Rohan Iyer', 'Ananya Reddy', 'Vivaan Nair',
  'Ishita Rao', 'Kabir Menon', 'Sanya Pillai', 'Arjun Subramaniam', 'Meera Chandran',
  'Aditya Varma', 'Priya Balan', 'Nikhil Suresh', 'Tara Ramesh', 'Dev Krishnamurthy',
];

function buildPrediction(i) {
  const daysAgo = Math.floor(rand() * 60);
  const createdAt = new Date(Date.now() - daysAgo * 86400000);
  const confidence = Math.round(58 + rand() * 40);
  const prediction = confidence > 76 ? PREDICTION_LABELS[0] : rand() > 0.5 ? PREDICTION_LABELS[0] : PREDICTION_LABELS[1];

  const isEvaluated = rand() > 0.32;
  let actualOutcome = 'Not Known Yet';
  let status = 'Pending';

  if (isEvaluated) {
    const matches = rand() > 0.24; // ~76% accuracy baseline
    if (prediction === 'Likely to Purchase') {
      actualOutcome = matches ? 'Purchased' : 'Did Not Purchase';
    } else {
      actualOutcome = matches ? 'Did Not Purchase' : 'Purchased';
    }
    status = matches ? 'Correct' : 'Incorrect';
  }

  const orderValue = Math.round(600 + rand() * 8500);

  return {
    _id: `pred_${1000 + i}`,
    userId: MOCK_USER._id,
    customer: CUSTOMER_NAMES[i % CUSTOMER_NAMES.length],
    inputData: {
      customerId: `CUST-${10000 + i}`,
      age: 20 + Math.floor(rand() * 40),
      gender: rand() > 0.5 ? 'Female' : 'Male',
      location: CITIES[i % CITIES.length],
      segment: CUSTOMER_SEGMENTS[i % CUSTOMER_SEGMENTS.length],
      productCategory: PRODUCT_CATEGORIES[i % PRODUCT_CATEGORIES.length],
      orderValue,
      quantity: 1 + Math.floor(rand() * 4),
      discount: Math.floor(rand() * 25),
      paymentMethod: PAYMENT_METHODS[i % PAYMENT_METHODS.length],
      shippingMethod: SHIPPING_METHODS[i % SHIPPING_METHODS.length],
      previousOrders: Math.floor(rand() * 30),
      previousSpending: Math.round(rand() * 60000),
      avgOrderValue: Math.round(1000 + rand() * 4000),
      returnCount: Math.floor(rand() * 3),
      customerTenure: Math.floor(rand() * 36),
    },
    prediction,
    confidence,
    actualOutcome,
    status,
    createdAt: createdAt.toISOString(),
    evaluatedAt: isEvaluated ? new Date(createdAt.getTime() + 3 * 86400000).toISOString() : null,
  };
}

export const MOCK_PREDICTIONS = Array.from({ length: 42 }, (_, i) => buildPrediction(i)).sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

// -----------------------------
// Derived stats
// -----------------------------
export function computeStats(predictions = MOCK_PREDICTIONS) {
  const total = predictions.length;
  const correct = predictions.filter((p) => p.status === 'Correct').length;
  const incorrect = predictions.filter((p) => p.status === 'Incorrect').length;
  const pending = predictions.filter((p) => p.status === 'Pending').length;
  const evaluated = correct + incorrect;
  const accuracy = evaluated > 0 ? Math.round((correct / evaluated) * 1000) / 10 : 0;
  return { total, correct, incorrect, pending, evaluated, accuracy };
}

export function predictionsOverTime(predictions = MOCK_PREDICTIONS) {
  const byDay = {};
  predictions.forEach((p) => {
    const d = new Date(p.createdAt);
    const key = `${d.getMonth() + 1}/${d.getDate()}`;
    byDay[key] = byDay[key] || { date: key, predictions: 0, correct: 0, incorrect: 0 };
    byDay[key].predictions += 1;
    if (p.status === 'Correct') byDay[key].correct += 1;
    if (p.status === 'Incorrect') byDay[key].incorrect += 1;
  });
  return Object.values(byDay).sort((a, b) => {
    const [am, ad] = a.date.split('/').map(Number);
    const [bm, bd] = b.date.split('/').map(Number);
    return am - bm || ad - bd;
  });
}

export function accuracyOverTime(predictions = MOCK_PREDICTIONS) {
  const sorted = [...predictions].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  let correct = 0;
  let evaluated = 0;
  const points = [];
  sorted.forEach((p) => {
    if (p.status === 'Correct' || p.status === 'Incorrect') {
      evaluated += 1;
      if (p.status === 'Correct') correct += 1;
      const d = new Date(p.createdAt);
      points.push({
        date: `${d.getMonth() + 1}/${d.getDate()}`,
        accuracy: Math.round((correct / evaluated) * 1000) / 10,
      });
    }
  });
  // thin to ~14 points for a readable chart
  const step = Math.max(1, Math.floor(points.length / 14));
  return points.filter((_, i) => i % step === 0);
}

export function confidenceVsCorrectness(predictions = MOCK_PREDICTIONS) {
  return predictions
    .filter((p) => p.status !== 'Pending')
    .map((p) => ({
      confidence: p.confidence,
      correct: p.status === 'Correct' ? 1 : 0,
      label: p.status,
    }));
}

export function distributionByCategory(predictions = MOCK_PREDICTIONS) {
  const map = {};
  predictions.forEach((p) => {
    const cat = p.inputData.productCategory;
    map[cat] = (map[cat] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export const MODEL_METRICS = {
  _id: 'metrics_001',
  ...computeStats(),
  updatedAt: new Date().toISOString(),
};
