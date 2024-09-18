import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';

const Downloads = () => {

    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deviceList, setDeviceList] = useState([]);
    const [oem,setOem]=useState('')
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    
    const oemToggle=async (deviceOem)=>{
      // const doem = await deviceOem
      if(oem===deviceOem){
        setOem(null)
        console.log(oem)
      }
      else{
        setOem(deviceOem)
        console.log(oem)
      }
    }
    // Fetch the list of devices
    const fetchDevices = async () => {
      const url = "https://raw.githubusercontent.com/Evolution-X/official_devices/udc/devices.json";
      
      try {
        setLoading(true);  // Start loading
        const response = await fetch(url);
        const devicedata = await response.json();
        return devicedata;
      } catch (error) {
        console.error("Error fetching devices:", error);
        return [];  // Return an empty array on error
      } finally {
        setLoading(false);  // End loading
      }
    };
  
    // Fetch individual device data
    const fetchDeviceData = async () => {
      // Wait for all device data to be fetched
      const data = await Promise.all(devices.map(async (device) => {
        const durl = `https://raw.githubusercontent.com/Evolution-X/OTA/udc/builds/${device}.json`;
        try {
          const fetchedDevice = await fetch(durl);
          const fetchedDeviceData = await fetchedDevice.json();
          console.log(fetchedDeviceData.response[0]);
  
          return { codename: device, data: fetchedDeviceData.response[0] };
        } catch (error) {
          console.error(`Error fetching data for device ${device}:`, error);
          return { codename: device, data: null }; // Handle errors for individual devices
        }
      }));
  
      return data;  // Return the resolved data
    };
  
    // Load devices on component mount
    useEffect(() => {
      const loadDevices = async () => {
        const data = await fetchDevices();
        setDevices(data);  // Set state after fetching the device list
        console.log('Fetched devices:', data);  // Log the fetched data
      };
  
      loadDevices();  // Call the async function inside useEffect
    }, []);
  
    // Fetch and set device data when the `devices` state updates
    useEffect(() => {
      const loadDeviceData = async () => {
        if (devices.length > 0) {
          const data = await fetchDeviceData();
          console.log('Fetched device data:', data);  // Log fetched device data
          setDeviceList(data);  // Set state with fetched device data
        }
    };
    
    loadDeviceData();  // Call the async function when devices state changes
    // console.log(deviceList)
    }, [devices]);  // Trigger when `devices` state changes

    useEffect(()=>{
        console.log(deviceList)
        if(deviceList.length > 0){
            setLoading(false)
        }
    },[deviceList])
  
  return (
    <>
    <div className='w-3/5 mx-auto my-10 p-4 rounded-full space-x-2'>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='bg-slate-800 text-white rounded-full px-4 py-2 my-auto' placeholder='Search' />
      <button onClick={()=>oemToggle("Google")} className={`rounded-full px-4 py-2 ${oem==='Google'?'bg-blue-600':'bg-slate-800'}`}>Google</button>
      <button onClick={()=>oemToggle("Xiaomi")} className={`rounded-full px-4 py-2 ${oem==='Xiaomi'?'bg-blue-600':'bg-slate-800'}`}>Xiaomi</button>
      <button onClick={()=>oemToggle("Samsung")} className={`rounded-full px-4 py-2 ${oem==='Samsung'?'bg-blue-600':'bg-slate-800'}`}>Samsung</button>
      <button onClick={()=>oemToggle("Oneplus")} className={`rounded-full px-4 py-2 ${oem==='Oneplus'?'bg-blue-600':'bg-slate-800'}`}>Oneplus</button>
      <button onClick={()=>oemToggle("Motorola")} className={`rounded-full px-4 py-2 ${oem==='Motorola'?'bg-blue-600':'bg-slate-800'}`}>Motorola</button>
      <button onClick={()=>oemToggle("Nothing")} className={`rounded-full px-4 py-2 ${oem==='Nothing'?'bg-blue-600':'bg-slate-800'}`}>Nothing</button>
      <button onClick={()=>oemToggle("Lenovo")} className={`rounded-full px-4 py-2 ${oem==='Lenovo'?'bg-blue-600':'bg-slate-800'}`}>Lenovo</button>

    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-4/5 mx-auto'>
     
        {deviceList && !loading && 
        deviceList
        .filter(device => (oem && device.data.oem) === oem)
        .filter(device => 
          device.data?.device.toLowerCase().includes(searchQuery.toLowerCase()) || // Match device name
          device.codename.toLowerCase().includes(searchQuery.toLowerCase()) || // Match codename
          (device.data?.oem.toLowerCase()+" "+device.data?.device.toLowerCase()).includes(searchQuery.toLowerCase())
        )
        .map((device,index) => (
            <div key={index}>
                <div className='bg-slate-800 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'>
                  <img className='max-h-44 mx-auto' src={`https://github.com/Evolution-X/official_devices/blob/udc/images/devices/${device.codename}.png?raw=true`} alt="" />
                <div className='mt-5 text-center'>
                <h6 className='text-lg '>{device.data?.device}</h6>
                OEM : {device.data.oem} <br />
                Codename : {device.codename}   <br />
                Maintainer : {device.data?.maintainer} <br />
                <Link to={`/downloads/${device.codename}`}>
                <button className='w-full bg-blue-600 rounded-xl py-2 px-3 mt-5'>Download</button>
                </Link>
                </div>
                </div>
            </div>
        ))}
    </div>
    </>

  )
}

export default Downloads