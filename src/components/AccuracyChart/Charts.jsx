import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const GRID = 'rgba(255,255,255,0.06)';
const AXIS = '#8592AD';
const PALETTE = ['#3B82F6', '#22D3EE', '#F59E0B', '#34D399', '#FB7185', '#5B9CFF', '#67E8F9', '#FBBF24'];

const tooltipStyle = {
  background: '#0E1626',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  fontSize: 12,
  color: '#E7EBF5',
  boxShadow: '0 8px 32px rgba(3,7,18,0.5)',
};

export function AccuracyLineChart({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="date" stroke={AXIS} fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke={AXIS} fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} unit="%" />
        <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#A8B3CC' }} />
        <Line type="monotone" dataKey="accuracy" stroke="#22D3EE" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function PredictionsBarChart({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="date" stroke={AXIS} fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke={AXIS} fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: '#A8B3CC' }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#A8B3CC' }} />
        <Bar dataKey="correct" name="Correct" stackId="a" fill="#34D399" radius={[0, 0, 0, 0]} />
        <Bar dataKey="incorrect" name="Incorrect" stackId="a" fill="#FB7185" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function CorrectVsIncorrectPie({ correct, incorrect, pending, height = 240 }) {
  const data = [
    { name: 'Correct', value: correct, color: '#34D399' },
    { name: 'Incorrect', value: incorrect, color: '#FB7185' },
    { name: 'Pending', value: pending, color: '#FBBF24' },
  ].filter((d) => d.value > 0);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={58} outerRadius={82} paddingAngle={3}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} stroke="none" />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#A8B3CC' }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function DistributionBarChart({ data, height = 260 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} layout="vertical" margin={{ top: 8, right: 20, left: 8, bottom: 0 }}>
        <CartesianGrid stroke={GRID} horizontal={false} />
        <XAxis type="number" stroke={AXIS} fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
        <YAxis type="category" dataKey="name" stroke={AXIS} fontSize={11} tickLine={false} axisLine={false} width={110} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="value" radius={[0, 6, 6, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ConfidenceScatterChart({ data, height = 260 }) {
  const correct = data.filter((d) => d.correct === 1);
  const incorrect = data.filter((d) => d.correct === 0);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ScatterChart margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
        <CartesianGrid stroke={GRID} />
        <XAxis type="number" dataKey="confidence" name="Confidence" unit="%" stroke={AXIS} fontSize={11} tickLine={false} axisLine={false} domain={[40, 100]} />
        <YAxis type="number" dataKey="correct" name="Outcome" stroke={AXIS} fontSize={11} tickLine={false} axisLine={false} tick={false} width={10} />
        <Tooltip contentStyle={tooltipStyle} cursor={{ strokeDasharray: '3 3' }} />
        <Legend wrapperStyle={{ fontSize: 12, color: '#A8B3CC' }} />
        <Scatter name="Correct" data={correct} fill="#34D399" />
        <Scatter name="Incorrect" data={incorrect} fill="#FB7185" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
