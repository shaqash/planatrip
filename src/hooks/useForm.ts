import { useState } from 'react';

export default function useForm<T>(initial: T, onSubmit: Function, onChangeParseValue: (e: React.ChangeEvent<HTMLInputElement>) => any) {
  const [values, setValues] = useState<T>(initial);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return onSubmit(values);
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({
      ...values,
      [e.target.name]: onChangeParseValue(e),
    });
  }

  return {
    values,
    setValues,
    submit,
    handleFormChange,
  }
}