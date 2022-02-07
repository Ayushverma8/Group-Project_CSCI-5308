import { useEffect, useState } from "react";
import API_CLIENT from "../api/axiosClient";

function Home() {
    const [test, setTest] = useState();

    useEffect(async ()=>{
        let res = await API_CLIENT.get('test/');
        setTest(res.data)
    },[])

    return (
        <div>
            hello this is main page.
            backend returned {test && test.count}
        </div>
    )
}

export default Home;