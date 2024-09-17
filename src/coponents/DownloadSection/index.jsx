import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import mobile from '../../assets/rn13p+.png';
import { Link } from 'react-router-dom';

const DownloadSection = () => {
    const { codename } = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    const fetchDevice = async () => {
        const url = `https://raw.githubusercontent.com/Evolution-X/OTA/udc/builds/${codename}.json`;
        try {
            const response = await fetch(url);
            const fetchedDeviceData = await response.json();
            console.log(fetchedDeviceData.response[0]);
            return fetchedDeviceData.response[0];
        } catch (error) {
            console.error(`Error fetching data for device ${codename}:`, error);
            return null; // Return null in case of an error
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const device = await fetchDevice();
            setData(device);
            setLoading(false);
        };
        fetchData();
    }, [codename]); // Add codename as a dependency to refetch when it changes

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while fetching data
    }

    if (!data) {
        return <div>No data found for device {codename}</div>; // Handle case where no data is found
    }

    return (
        <div className='w-4/5 mx-auto mt-10 bg-slate-800 p-5 rounded-xl'>
            {(data && !loading) && <>
            
            <div className='grid grid-cols-2'>
                <div>
                    <img className='rounded-xl w-full' src={mobile} alt="Device" />
                </div>
                <div>
                    <div className='mt-12 w-4/5 mx-auto rounded-xl bg-slate-700 p-3'>
                    <h3 className='text-xl my-2'>{data.device}</h3>
                     <span className='text-lg my-2'>Codename - {codename}</span><br />
                     <span className='text-lg my-2'>Maintained by - {data.maintainer}</span> <br />

                     <div className='grid grid-cols-2 mx-auto mt-10'>
                        <div>
                            <Link to={data.forum} target='_blank'>
                            <button className='w-5/6 mx-auto px-3 bg-rose-500 rounded-xl py-2 text-center'>Forum</button>
                            </Link>
                        </div>
                        <div className=''>
                            <Link to={data.download} target='_blank'>
                            <button className='w-5/6 mx-auto px-3 bg-violet-600 rounded-xl py-2 text-center'>Download</button>
                            </Link>
                        </div>
                     </div>
                    </div>
                </div>
            </div>
            </>

            }
        </div>
    );
};

export default DownloadSection;
