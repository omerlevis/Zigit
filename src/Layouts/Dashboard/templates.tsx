import React, { ReactNode } from 'react';
import coverPhoto from '../../Images/zigitlogo.png';

interface BodyProps {
	children: ReactNode;
}

export const Body: React.FC<BodyProps> = ({ children }) => {
	return (
        <div className="font-sans antialiased">
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">

                            <div className="shrink-0 flex items-center">
                                <img src={coverPhoto} alt="Cover Photo" className="block h-10 w-auto fill-current text-gray-600" />
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="card bg-light">
                    <br />
                    <div className="card-body">

                        <table className="table table-bordered bg-white">
                            <tbody>

                                {children}
                            </tbody>
                        </table>
            </div>
                    </div>
                </div>
            </div>
	)
}

interface CoverCardProps {
    children: ReactNode;
}

export const CoverCard: React.FC<CoverCardProps> = ({ children }) => {
    return (
        <tr>
            <td>
                <div className="card border border-white">
                    <div className="card-body">
                        {children}
                    </div>
                </div>
            </td>
        </tr>
    )
}


interface ContentProps {
    children: ReactNode;
}

export const Content: React.FC<ContentProps> = ({ children }) => {
    return (
        <tr>
            <td>
                <div className="row no-gutters">

                    <br /> 
                    {children}
                </div>
            </td>
        </tr>

    )
}


