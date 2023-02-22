import React, { useEffect, useState } from "react";
import { getApiData } from "./ApiRequests/apiRequests";
import "./AnimeData.css";
import { htmlData } from "./utills";
const AnimeData = ({ token }: { token: string }) => {
  const [contentData, setContentData] = useState<any>([]);
  const [loadData, setLoadData] = useState<boolean>(false);
  const [showAllData, setShowAllData] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const getAnimeData = async () => {
    try {
      setLoading(true);
      let res = await getApiData(token);
      setContentData(res?.data?.content);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAnimeData();
  }, [loadData]);
  const AnimeBodyData = htmlData(contentData?.text);
  return (
    <div className={showAllData ? "FullWidthContainer" : "Container"}>
      <button
        onClick={() => {
          setShowAllData(!showAllData);
        }}
        className={showAllData ? "CrossBtn" : "HideContainer"}
      >
        ✕
      </button>
      <div className={showAllData ? "HideContainer" : "Date"}>
        {new Date()
          .toLocaleString("locale", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
          .replace(",", "")}
      </div>
      {loading ? (
        <div className="Loading">Loading...</div>
      ) : (
        <>
          {" "}
          <div className={showAllData ? "HideContainer" : "topLogo"}>
            <div>Today</div>
            <img
              className="UserNameLogo"
              loading="lazy"
              src={`https://ui-avatars.com/api/?background=b1b3b4&color=000000&rounded=true&name=${contentData?.userName?.replace(
                " ",
                "+"
              )}`}
              alt="User Logo"
            />
          </div>
          <div
            className={
              showAllData ? "UpdateThumbnailContainer" : "ThumbnailContainer"
            }
          >
            <img
              className="ThumbnailImage"
              onClick={() => {
                if (showAllData) return;
                setShowAllData(!showAllData);
              }}
              src={contentData?.thumbNailImage}
              alt="Logo"
            />
            <div className="lastLogoContainer">
              <div>
                <img className="logoImage" src={contentData?.logo} alt="Logo" />
                <div>
                  <div className="AnimeTitle">{contentData?.title}</div>
                  <div className="AnimeSubTitle">{contentData?.subTitle}</div>
                </div>
              </div>
              <button onClick={() => setLoadData(!loadData)} className="btn">
                REFRESH
              </button>
            </div>
            <div className={showAllData ? "BodyAnime" : "HideContainer"}>
              {AnimeBodyData?.map((e: any, i: any) => {
                e = e?.split(" ");
                let bold = e?.slice(0, 3)?.join(" ");
                let normal = e?.slice(3)?.join(" ");
                return (
                  <div className="bodyMap" key={i}>
                    <span>
                      <b>{bold}</b> {normal}
                    </span>
                    {i == AnimeBodyData?.length - 2 ? (
                      <img
                        loading="lazy"
                        className="MainImage"
                        src={contentData?.mainImage}
                        alt="MainImage"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                );
              })}
            </div>
            <div className={showAllData ? "LastContainer" : "HideContainer"}>
              <div className="LastContainerLogo">
                <div>
                  <img
                    className="logoImageLastContainer"
                    src={contentData?.logo}
                    alt="Logo"
                  />
                  <div>
                    <div className="AnimeTitle">{contentData?.title}</div>
                    <div className="AnimeSubTitle">{contentData?.subTitle}</div>
                  </div>
                </div>
                <button onClick={() => setLoadData(!loadData)} className="btn1">
                  REFRESH
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnimeData;
