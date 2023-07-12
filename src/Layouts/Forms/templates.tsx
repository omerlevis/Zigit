import React, { ReactNode } from 'react';
import coverPhoto from '../../Images/zigitlogo.png';

interface BodyProps {
	children: ReactNode;
}

export const Body: React.FC<BodyProps> = ({ children }) => {
	return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "90vh" }}>
            <div className='card' style={{ width: "350px" }}>
                <img src={coverPhoto} alt="Cover Photo" className="card-img-top" />

                <div className='card-body'>
                    {children}
                </div>
            </div>
        </div>
	)
}