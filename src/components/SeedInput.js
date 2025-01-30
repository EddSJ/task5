import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSeed, generateNewSeed } from '../context/reducers/seedReducer';
import { FaCheck, FaSyncAlt } from 'react-icons/fa';
import { translations } from './translations';

const SeedInput = () => {
  const dispatch = useDispatch();
  const currentSeed = useSelector((state) => state.seed.seed);
  const [inputSeed, setInputSeed] = useState(currentSeed);
  const currentLanguage = useSelector((state) => state.region.region);

  useEffect(() => {
    setInputSeed(currentSeed);
  }, [currentSeed]);

  const handleSeedChange = (e) => {
    setInputSeed(e.target.value);
  };

  const handleSetSeed = () => {
    dispatch(setSeed(Number(inputSeed)));
  };

  const handleGenerateNewSeed = () => {
    dispatch(generateNewSeed());
  };

  const t = translations[currentLanguage];

  return (
    <div className="mb-3">
      <label htmlFor="reviews-input" className="form-label">{t.seed}</label>
      <div className="input-group">
        <input
          type="number"
          className="form-control"
          value={inputSeed}
          onChange={handleSeedChange}
          placeholder={t.enterSeed}
        />
        <button
          className="btn btn-primary btn-sm"
          onClick={handleSetSeed}
          title={t.setSeed} 
        >
          <FaCheck /> 
        </button>
        <button
          className="btn btn-success btn-sm"
          onClick={handleGenerateNewSeed}
          title={t.generateNewSeed} 
        >
          <FaSyncAlt />
        </button>
      </div>
    </div>
  );
};

export default SeedInput;