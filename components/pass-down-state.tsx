import { ChangeEvent, useState } from 'react';

const scaleList = {
  c: { name: 'Celsius', boilingPoint: 100 },
  f: { name: 'Fahrenheit', boilingPoint: 212 },
};

// - Sample passing down state, state-setter and local variable to child component -
export const TemperatureCalculator = (): JSX.Element => {
  const [temperature, setTemperature] = useState({ scale: 'c', number: '0' });
  const celcius =
    temperature.scale === 'f'
      ? tryConvert(temperature.number, toCelsius)
      : temperature.number;
  const fahrenheit =
    temperature.scale === 'c'
      ? tryConvert(temperature.number, toFahrenheit)
      : temperature.number;

  return (
    <div>
      <h2>Temperature Calculator</h2>
      <TemperatureInput
        scale="c"
        temperature={celcius}
        // pass down the setter of the state to child component
        temperatureSetter={setTemperature}
      />
      <TemperatureInput
        scale="f"
        temperature={fahrenheit}
        // pass down the setter of the state to child component
        temperatureSetter={setTemperature}
      />
      <WaterStatus celcius={celcius} />
    </div>
  );
};

const TemperatureInput = (props: any): JSX.Element => {
  const { temperature, temperatureSetter } = props;
  const scale = props.scale as keyof typeof scaleList;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    temperatureSetter({ scale: scale, number: e.target.value });
  };

  return (
    <fieldset>
      <legend>Enter temperature in {scaleList[scale].name}:</legend>
      <input value={temperature} onChange={handleChange} />
    </fieldset>
  );
};

const WaterStatus = (props: any): JSX.Element => {
  const celcius = props.celcius as string;
  let message = 'The water would not boil';

  if (parseFloat(celcius) >= scaleList['c'].boilingPoint) {
    message = 'The water would boil';
  }

  return <div>{message}</div>;
};

function toCelsius(fahrenheit: number) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsius: number) {
  return (celsius * 9) / 5 + 32;
}

function tryConvert(temperature: string, convert: (input: number) => number) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
