export default function Field({ name, label, type, autoComplete, required }) {
  return (
    <div>
      <label htmlFor={`${name}-input`} id={`${name}-label`}>
        {label} {required && <span title="Required">*</span>}
      </label>
      <br />
      <input
        autoComplete={autoComplete}
        id={`${name}-input`}
        name={name}
        required={required}
        type={type}
      />
    </div>
  )
}
