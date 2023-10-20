import React, { useState } from 'react';

export default function SearchBar() {
  const [input, setInput] = useState('');

  const handleChange = () => {
    const message = "Doesn't work :(";
    setInput(message);
  };

  return (
    <div className="s-in">
      <input
        className="my-3"
        placeholder="Search members"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
