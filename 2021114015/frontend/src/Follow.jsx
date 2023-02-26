import { useNavigate } from "react-router-dom"

export const Followers = () => {
    const navigate=useNavigate();
    return (
        <div>
            <h1>Followers list:</h1>
            <h2>
                <br />
                1. PCB_memes
                <br />
                2. Zimbabar-memepage
                <br />
                3. ICT-memes-official
                <br />
                4. MI-Official
                <br />
                5. Twenty20memes
            </h2>
            <button onClick={()=>{navigate('/profile')}}>Go Back</button>
        </div>
    )
}

export const Following = () => {
    const navigate=useNavigate();
    return (
        <div>
            <h1>Following List:</h1>
            <h2>
                <br /> 
                1. PCB_memes
                <br />
                2. Zimbabar-memepage
                <br />
                3. ICT-memes-official
                <br />
                4. MI-memes
                <br />
                5. Twenty20memes <br /> 6. BCCI_OFFICIAL <br /> 7. TheRealICTpage <br /> 8. MI_Official <br /> 9. VK74 <br /> 
                10. HardikPandyaOfficial <br /> 11. RGSharma-MrHitman <br /> 
            </h2>
            <button onClick={()=>{navigate('/profile')}}>Go Back</button>
        </div>
    )
}