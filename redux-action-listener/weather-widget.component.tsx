import React, { useEffect } from 'react';
import {
  Typography,
  TypographyVariants,
} from '@dealersocket/ds-ui-react/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAsyncOperation } from '../../../shared/utils/use-async-operation';
import { useUpdateFiltersActionListener } from '../state/desk-log/desk-log.actions';

const useStyles = makeStyles(
  (): any => ({
    text: {
      marginTop: 2,
      color: 'white',
    },
  })
);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Fake API function to simulate calling an endpoint and getting data
async function fakeWeatherApi(): Promise<string> {
  await sleep(3000);
  const icons = ['☀', '☁', '🌤', '🌧', '🌪'];
  const icon = icons[Math.floor(Math.random() * Math.floor(icons.length))];
  return `${30 + Math.floor(Math.random() * Math.floor(70))}°F ${icon}`;
}

export function WeatherWidget(): React.ReactElement {
  console.log('### <FakeWidget> - render');

  useEffect(() => {
    console.log('### <FakeWidget> - >>>>> mount <<<<<');
  }, []);

  const [loadTemp, isBusy, temperature] = useAsyncOperation(fakeWeatherApi);

  useUpdateFiltersActionListener(action => {
    console.log('This was dispatched', action);
    loadTemp();
  });

  useEffect(() => {
    loadTemp();
  }, []);

  useEffect(() => {
    return () => console.log('### <FakeWidget> - >>>>> un-mount <<<<<');
  }, []);

  const styles: any = useStyles();

  return (
    <Typography variant={TypographyVariants.H6} className={styles.text}>
      {(!temperature || isBusy) && 'Loading...'}
      {!isBusy && temperature}
    </Typography>
  );
}
