import { Row,Col } from 'antd';
import {useState,useEffect} from 'react';
import {AiOutlineQrcode,AiTwotoneContainer,AiOutlineKey,AiOutlineUser} from 'react-icons/ai';
import WalletResetPasswordModal from "../component/WalletResetPasswordModal";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
function WalletProfile() {
  const [t,i18n] = useTranslation();
  const [use,setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [showModal,setShowModal] = useState(false);
  const [ethPrice,setEthPrice]= useState(2000);
  useEffect(()=>{
  axios.get("https://api.blockchair.com/ethereum/stats").then(({data})=>{
    setEthPrice(data.data["market_price_usd"])
  }).catch(console.error)},[ethPrice])
  return (
      <>
    <Col span={22} offset={1} className="mt-8 myColor1 text-sm">
     <Row>
       <Col span={12} className="text-left text-overflow" >Eth Current Price</Col>
       <Col span={12} className="text-left">
      {ethPrice} Usd

       </Col>
      </Row>
      <Row>
       <Col>Bsc Current Price</Col>
       <Col></Col>
      </Row>
    </Col>
    <Col span={22} offset={1} className="mt-8 myColor1 text-sm">
      <Row>
        <Col span={20}>
         {t('Email Address')} 
        </Col>
        <Col span={4} className="text-center text-overflow">
          {t('Edit Password')}
        </Col>
      </Row>

      <Row className="text-lg font-bold">
        <Col span={20}>
          {t(use.email)}
        </Col>
        <Col span={4} className="text-center">
          <a onClick={()=>setShowModal(true)}><AiOutlineKey size={20} className="inline mr-2"/></a>
        </Col>
      </Row>


      {
        showModal?
          <WalletResetPasswordModal  setModalShow={setShowModal} title="Reset Password"/>
        : null
      }
    </Col>
      </>
  );
}

export default WalletProfile;
