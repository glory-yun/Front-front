import Nav_ from "./Nav_";
import styles from "../CSS/Detail.module.css";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation, location } from "react-router-dom";
import DetailModal from "../components/DetailModal";
import axios from "axios";
import { useFindState } from "../store/Statefind";

function Detail() {

  const [one, setone] = useState(); 

  const findState = useFindState();
  const [partner, setPartner] = useState([
    {
      EPRICE: null,
      EXPERT1: null,
      EXPERT2: null,
      GNAME: null,
      IG: null,
      IMG: null,
      INTRO: null,
      PID: null,
      PRICE: null,
      closed_days: {},
      partner_dong: null,
      partner_gender: null,
      partner_gu: null,
      partner_name: null,
      weekday_end_time: null,
      weekday_start_time: null,
      weekend_end_time: null,
      weekend_start_time: null,
    },
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const location = useLocation();

  const ptner = location.state.ptner;

  useEffect(() => {
    const fetchData = async () => {
      
      const partner_id = location.state.ptner.PID;

      console.log("PTD", partner_id);

      try {
        const response = await axios.get("/back/api/user/partner_detail", {
          params: { partner_id },
        });

        let CopyData = [...partner];

        CopyData = response.data.partner_info;

        setPartner(CopyData);

        console.log(CopyData); //추가했어

      } catch (err) {
        console.log(123, err.message);
      }
    };
    fetchData();
  }, [findState]);

  console.log("ptner2", partner, ptner);

  return (
    <>
      <Nav_></Nav_>
      <div className={styles.container}>
        <div className={styles.Detailinformation}>
          <h4>파트너 상세정보</h4>
          <div className={styles.Item}>
            <div className={styles.Itemimg}></div>

            <div className={styles.Partnercontainer}>
              <div className={styles.PartnerInfo}>
                <p style={{ fontSize: "1.5rem" }}>
                  {partner.partner_name} 트레이너
                </p>
                <p>
                  {partner.partner_gender == 1 ? "남성" : "여성"}{" "}
                  <span className={styles.line}>|</span> 30세
                </p>
                <p>
                  {partner.partner_gu} {partner.partner_dong}{" "}
                  <span className={styles.line}>|</span> {partner.GNAME}
                </p>
                <p>
                  ⭐️⭐️⭐️⭐️⭐️ <span>{ptner.avg_rate} (28)</span>
                </p>
              </div>

              <div className={styles.Partnerprice}>
                <div className={styles.price}>
                  <div>
                    <p>정상가 (회당)</p>
                    <span className={styles.Pricefont}>{partner.PRICE}</span>
                    <span className={styles.Pricefont}>원</span>
                  </div>
                  <span className={styles.line}>|</span>
                  <div>
                    <p>1회 체험가</p>
                    <span className={styles.Pricefont}>{partner.EPRICE}</span>
                    <span className={styles.Pricefont}>원</span>
                  </div>
                </div>
                <button onClick={openModal}>1회 체험 예약하기</button>

                {/* DetailModal */}
                <DetailModal isOpen={modalIsOpen} onRequestClose={closeModal} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.Introduce}>
          <h4> 파트너 소개 </h4>
          <hr></hr>
          <div>{partner.INTRO}</div>
        </div>

        <div className={styles.InfoContainer}>
          <div className={styles.left}>
            <div className={styles.Expert}>
              <h4>Expert</h4>
              <hr></hr>
              <ul>
                <li>{partner.EXPERT1}</li>

                <li>{partner.EXPERT2}</li>
              </ul>
            </div>

            <div className={styles.LessonTime}>
              <h4>레슨 가능 시간</h4>
              <hr></hr>
              <ul>
                <li>평일 : 10:00 ~ 22:00</li>
                <li>주말 : 10:00 ~ 18:00</li>
                <li>휴무일 : 화요일</li>
              </ul>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.Gyminformation}>
              <h4>헬스장 정보</h4>
              <hr></hr>
              <div>
                <span style={{ fontSize: "1.5rem" }}>{partner.GNAME}</span>
                <span className={styles.line}>|</span>
                <span>서울시 성북구 정릉로 48</span>
              </div>
            </div>
            <div className={styles.GymMap}>123</div>
          </div>
        </div>

        <div className={styles.PartnerImg}>
          <h4>파트너 사진</h4>
          <hr></hr>
          <div className={styles.Imgwrap}>
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>

        <div className={styles.ReviewContainer}>
          <h4>리뷰</h4>
          <hr></hr>
          <div className={styles.Review}>
            <select className={styles.ReviewFilter}>
              <option>평점 높은 순</option>
              <option>평점 낮은 순</option>
              <option>최신순</option>
              <option>오래된 순</option>
            </select>

            <div className={styles.ReviewDetail}>
              <div className={styles.ReviewItem}>
                <div>User Name</div>
                <div>남성</div>
                <div>⭐️⭐️⭐️⭐️⭐️</div>
                <div style={{ flexGrow: "1" }}></div>
                <div>2024.07.14</div>
              </div>
              <div className={styles.ReviewContent}>
                {partner.GNAME}
                에서 너무나도 친절하게 알려주시고 너무 감사드립니다
                수업도 너무 재미있네요
              </div>
            </div>

            <div className={styles.ReviewDetail}>
              <div className={styles.ReviewItem}>
                <div>User Name</div>
                <div>남성</div>
                <div>⭐️⭐️⭐️⭐️⭐️</div>
                <div style={{ flexGrow: "1" }}></div>
                <div>2024.07.14</div>
              </div>

              <div className={styles.ReviewContent}>
                안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
                안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
                안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
                안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
                안녕하세요 안녕하세요 안녕하세요 안녕하세요
              </div>
            </div>
            <div className={styles.ReviewDetail}>
              <div className={styles.ReviewItem}>
                <div>User Name</div>
                <div>남성</div>
                <div>⭐️⭐️⭐️⭐️⭐️</div>
                <div style={{ flexGrow: "1" }}></div>
                <div>2024.07.14</div>
              </div>

              <div className={styles.ReviewContent}>
                안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
                안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
                안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
                안녕하세요 안녕하세요 안녕하세요 안녕하세요 안녕하세요
                안녕하세요 안녕하세요 안녕하세요 안녕하세요
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
