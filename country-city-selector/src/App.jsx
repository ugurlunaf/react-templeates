import { useEffect, useState } from "react";
import "./App.css";
import Selector from "./components/Selector";
import { Country, State, City } from "country-state-city";

function App() {
  // Data
  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  // Selections
  const [country, setCountry] = useState(countryData[224]); // Defaut country Turkey
  const [state, setState] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[1]);
  }, [cityData]);

  return (
    <div className="px-3 min-h-screen grid place-items-center">
      <div className="p-5 px-8 bg-blue-200 rounded-lg">
        <h1 className="text-xl font-semibold text-purple-950">
          Country - State - City Selector
        </h1>
        <br />
        <div className="flex flex-wrap gap-3">
          <div>
            <h2>Country</h2>
            <Selector
              data={countryData}
              selected={country}
              setSelected={setCountry}
            />
          </div>

          {state && (
            <div>
              <h2>State</h2>
              <Selector
                data={stateData}
                selected={state}
                setSelected={setState}
              />
            </div>
          )}

          {city && (
            <div>
              <h2>City</h2>
              <Selector data={cityData} selected={city} setSelected={setCity} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
