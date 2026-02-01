import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../api/kakaoApi";


const KakaoLoginComponent = () => {

    const link = getKakaoLoginLink()

    return (
        <Link to={link}><img height={30} width={30} src='image/kakao-talk_3669973.png' /></Link>

    )
}

export default KakaoLoginComponent;
