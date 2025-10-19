import React from "react";

interface FitnessContextType {
  unit: string;
  setUnit: (v: string) => void;
  weight: number | "";
  setWeight: (v: number | "") => void;
  height: number | "";
  setHeight: (v: number | "") => void;
  age: number | "";
  setAge: (v: number | "") => void;
  gender: string;
  setGender: (v: string) => void;
  activity: number;
  setActivity: (v: number) => void;
  bodyFat: number | "";
  setBodyFat: (v: number | "") => void;
  bmr: number;
  tdee: number;
  bmi: string;
  idealWeight: string;
}

export default function TdeeCalculatorLandingPage({
  unit,
  setUnit,
  weight,
  setWeight,
  height,
  setHeight,
  age,
  setAge,
  gender,
  setGender,
  activity,
  setActivity,
  bodyFat,
  setBodyFat,
  bmr,
  tdee,
  bmi,
  idealWeight,
}: FitnessContextType) {
  return (
    <section
      id="calc"
      className="max-w-5xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-slate-200 mb-20"
    >
      <h2 className="text-2xl font-bold text-center text-[#0f172a] mb-6">
        🔥 Quick TDEE & BMR Calculator
      </h2>

      {/* Unit Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex border border-slate-300 rounded-full overflow-hidden text-sm">
          {["metric", "imperial"].map((opt) => (
            <button
              key={opt}
              onClick={() => setUnit(opt)}
              className={`px-4 py-1.5 cursor-pointer transition ${
                unit === opt
                  ? "bg-sky-100 text-sky-800 font-semibold"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {opt === "metric" ? "Metric (kg/cm)" : "Imperial (lb/in)"}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          label={`Weight (${unit === "metric" ? "kg" : "lb"})`}
          placeholder="e.g., 70"
          value={weight}
          onChange={setWeight}
        />
        <Input
          label={`Height (${unit === "metric" ? "cm" : "inch"})`}
          placeholder="e.g., 175"
          value={height}
          onChange={setHeight}
        />
        <Input
          label="Age (years)"
          placeholder="e.g., 30"
          value={age}
          onChange={setAge}
        />
        <Select
          label="Gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          value={gender}
          onChange={setGender}
        />
        <Select
          label="Activity Level"
          options={[
            { label: "Sedentary (little or no exercise)", value: 1.2 },
            { label: "Lightly active (1–2 days/week)", value: 1.375 },
            { label: "Moderately active (3–4 days/week)", value: 1.55 },
            { label: "Very active (5–6 days/week)", value: 1.725 },
            { label: "Extra active (daily or physical job)", value: 1.9 },
          ]}
          value={activity}
          onChange={setActivity}
        />
        <Input
          label="Body Fat % (optional)"
          placeholder="e.g., 18"
          value={bodyFat}
          onChange={setBodyFat}
          hint="Adds precision using Katch–McArdle formula."
        />
      </div>

      {/* Results */}
      <div className="mt-10 rounded-xl bg-sky-50 border border-sky-200 p-6 text-center">
        <h3 className="text-sm font-bold text-sky-900 mb-2">
          Your Maintenance Calories
        </h3>

        <p className="text-5xl text-slate-700 mb-4">
          <strong className="text-sky-700 ">
            {tdee ? tdee.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
          </strong>{" "}
          calories per day
        </p>
        <p className="text-slate-600 text-base mt-1">
          ≈ {(tdee * 7).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          calories per week
        </p>

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-sky-200 text-slate-700 bg-white rounded-xl shadow-inner">
          <div className="p-3">
            <p className="font-semibold text-sky-800">BMR</p>
            <p className="text-lg font-bold text-[#0f172a]">
              {bmr.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} kcal/day
            </p>
          </div>
          <div className="p-3">
            <p className="font-semibold text-sky-800">BMI</p>
            <p className="text-lg font-bold text-[#0f172a]">{bmi}</p>
          </div>
          <div className="p-3">
            <p className="font-semibold text-sky-800">Ideal Weight</p>
            <p className="text-lg font-bold text-[#0f172a]">{idealWeight} kg</p>
          </div>
        </div>

        {tdee > 0 && (
          <p className="text-sm text-slate-500 mt-4">
            To lose weight: ~
            <strong>
              {(tdee * 0.8).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </strong>{" "}
            kcal/day • To gain muscle: ~
            <strong>
              {(tdee * 1.1).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </strong>{" "}
            kcal/day
          </p>
        )}
      </div>

      <p className="italic text-slate-500 mt-4">
        Disclaimer: These calculations provide science-based estimates. Real
        energy needs may vary with factors like stress, sleep, genetics, and
        hormonal balance. Always consult a dietitian or healthcare provider for
        personalized guidance.
      </p>
    </section>
  );
}

/* ----- Reusable Subcomponents ----- */
function Input({
  label,
  placeholder,
  value,
  onChange,
  hint,
}: {
  label: string;
  placeholder: string;
  value: number | "";
  onChange: (v: number | "") => void;
  hint?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-800">
      {label}
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="w-full mt-1 p-2 border rounded-md bg-[#f9fafb] border-slate-300 text-slate-800 
          focus:ring-2 focus:ring-sky-200 focus:border-sky-400 outline-none transition cursor-text"
      />
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string | number;
  onChange: (v: any) => void;
  options: { label: string; value: any }[];
}) {
  return (
    <label className="block text-sm font-semibold text-slate-800">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 p-2 border rounded-md bg-[#f9fafb] border-slate-300 text-slate-800 
          focus:ring-2 focus:ring-sky-200 focus:border-sky-400 outline-none cursor-pointer transition"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
