import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PREDICTION_FORM_CONFIG } from '../../data/mockData';

function Field({ field, value, error, onChange }) {
  const commonProps = {
    id: field.name,
    name: field.name,
    value: value ?? '',
    onChange: (e) => onChange(field.name, e.target.value),
    className: `input-field ${error ? '!border-bad/60 !ring-1 !ring-bad/40' : ''}`,
    placeholder: field.placeholder,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={field.name} className="label-sm">
        {field.label} {field.required && <span className="text-bad">*</span>}
      </label>
      {field.type === 'select' ? (
        <div className="relative">
          <select {...commonProps} className={`${commonProps.className} appearance-none pr-9`}>
            <option value="" disabled>
              Select {field.label.toLowerCase()}
            </option>
            {field.options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-mist-400 pointer-events-none" />
        </div>
      ) : (
        <input
          type={field.type}
          min={field.min}
          max={field.max}
          {...commonProps}
        />
      )}
      {error && <span className="text-xs text-bad">{error}</span>}
    </div>
  );
}

export default function PredictionForm({ onSubmit, isSubmitting }) {
  const initialValues = PREDICTION_FORM_CONFIG.flatMap((s) => s.fields).reduce(
    (acc, f) => ({ ...acc, [f.name]: '' }),
    {}
  );
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    PREDICTION_FORM_CONFIG.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.required && !String(values[field.name]).trim()) {
          nextErrors[field.name] = 'Required';
        }
      });
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const normalized = { ...values };
    PREDICTION_FORM_CONFIG.flatMap((s) => s.fields).forEach((f) => {
      if (f.type === 'number' && normalized[f.name] !== '') {
        normalized[f.name] = Number(normalized[f.name]);
      }
    });
    onSubmit(normalized);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {PREDICTION_FORM_CONFIG.map((section) => (
        <div key={section.section} className="glass-card p-6">
          <h3 className="font-display text-sm font-semibold text-mist-100 mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            {section.section}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.fields.map((field) => (
              <Field
                key={field.name}
                field={field}
                value={values[field.name]}
                error={errors[field.name]}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center justify-end gap-3">
        <button type="submit" className="btn-primary min-w-[180px]" disabled={isSubmitting}>
          {isSubmitting ? 'Analyzing retail data...' : 'Run Prediction'}
        </button>
      </div>
    </form>
  );
}
