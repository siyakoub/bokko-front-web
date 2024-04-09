import React from 'react';
import './tripStyle.css';

interface TripProps {
    departureTime: string;
    duration: string;
    driver: {
        name: string;
        profilePicture: string;
    };
    driverRating: number;
    price: number;
}

const TripComponent: React.FC<TripProps> = ({
                                                departureTime,
                                                duration,
                                                driver,
                                                driverRating,
                                                price
                                            }) => {
    return (
        <div className="trip">
            <div className="trip-info">
                <span>{departureTime}</span>
                <span>{duration}</span>
            </div>
            <div className="driver-info">
                <img src={driver.profilePicture} alt={`${driver.name}`} className="driver-img" />
                <div>
                    <div>{driver.name}</div>
                    <div>{`Rating: ${driverRating.toFixed(1)}`}</div>
                </div>
            </div>
            <div className="price">
                <span>{`${price.toFixed(2)} €`}</span>
            </div>
        </div>
    );
};

export default TripComponent;
