import React from 'react';
import {Card, CardContent, Typography } from '@material-ui/core'

function InfoBox({type, cases, ...props}) {
    return(
        <Card onClick={props.onClick}>
            <CardContent>
                <Typography color="textSecondary">{type}</Typography>
                <h2>{cases}</h2>
            </CardContent>
            <div className={type === 'Recovered' ? 'stripeg': 'stripes'}>
            </div>
        </Card>
    );
}

export default InfoBox;