import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRegion } from '../context/reducers/regionReducer';
import { translations } from './translations';

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const region = useSelector((state) => state.region.region);
  const currentLanguage = useSelector((state) => state.region.region);
  

  const handleRegionChange = (event) => {
    dispatch(setRegion(event.target.value));
  };

  const t = translations[currentLanguage];

  return (
    <div className="mb-3">
      <label htmlFor="region-select" className="form-label">{t.selectRegionLabel}</label> {/* Usamos la traducción aquí */}
      <select
        id="region-select"
        className="form-select"
        value={region}
        onChange={handleRegionChange}
      >
        <option value="fr">{t.regionOptions.fr}</option>
        <option value="en">{t.regionOptions.en}</option>
        <option value="de">{t.regionOptions.de}</option>
      </select>
    </div>
  );
};

export default LanguageSelector