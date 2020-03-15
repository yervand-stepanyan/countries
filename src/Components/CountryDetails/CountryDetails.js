import React from 'react';
import styles from './countryDetails.module.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default class CountryDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      errorText: '',
      country: ''
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    this.fetchCountries();
  }

  fetchCountries = () => {
    const { name } = this.props.match.params;

    if (name) {
      fetch(`https://restcountries.eu/rest/v2/name/${name}`)
        .then(res => res.json())
        .then(res => {
          if (res.status === 404) {
            throw new Error('No Data');
          }
          return res;
        })
        .then(res =>
          this.setState({
            country: res[0],
            isLoading: false,
            errorText: ''
          })
        )
        .catch(err =>
          this.setState({
            isLoading: false,
            errorText: err.message,
            countries: []
          })
        );
    }
  };

  render() {
    const { isLoading, errorText, country } = this.state;

    return (
      <div className={styles.main}>
        <div className={styles.countryWrapper}>
          {errorText ? (
            <p>{errorText}</p>
          ) : isLoading ? (
            <p>Loading ...</p>
          ) : (
            <Card key={country.name} className={styles.cardStyle}>
              <CardContent className={styles.cardContent}>
                <Typography
                  className={styles.countryName}
                  component="h2"
                  gutterBottom
                  color="primary"
                >
                  {country.name}
                </Typography>
                <Typography variant="h6" gutterBottom color="textSecondary">
                  {country.capital}
                </Typography>
                <Typography variant="h6" gutterBottom color="textSecondary">
                  Domain: {country.topLevelDomain}
                </Typography>
                <Typography variant="body2" component="p">
                  Population: {country.population}
                </Typography>
                <CardMedia
                  image={country.flag}
                  className={styles.cardFlag}
                  title="Country flag"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }
}
