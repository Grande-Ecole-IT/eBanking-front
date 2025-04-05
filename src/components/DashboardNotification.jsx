import React from 'react';

const DashboardNotification = ({ transactionDemands }) => {
    return (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-50">
            <div className="p-3">
                {!transactionDemands ? (
                    <>
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="animate-pulse m-3">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                        <div className="animate-pulse m-3">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </>
                ) :
                    ("hello")}
            </div>
        </div>
    )
}

export default DashboardNotification