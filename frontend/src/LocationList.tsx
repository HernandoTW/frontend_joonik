
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const LocationList: React.FC = () => {
    const [locations, setLocations] = useState<any[]>([]);
    const apiKey = 'myapikey';

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await fetch('http://127.0.0.1:8000/api/locations', {
                method: 'GET',
                headers: {
                    'API-Key': apiKey,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setLocations(data);
            } else {
                console.error('Error fetching locations:', response.statusText);
            }
        };

        fetchLocations();
    }, []);

    return (
        <Grid container spacing={2}>
            {locations.map((location) => (
                <Grid item xs={12} sm={6} md={4} key={location.code}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">{location.name}</Typography>
                            <img src={location.image} alt={location.name} />
                            <Typography color="textSecondary">Código: {location.code}</Typography>
                            <Typography color="textSecondary">Fecha de creación: {location.creationDate}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default LocationList;
