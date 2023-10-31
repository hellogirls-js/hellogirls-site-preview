import { ImageResponse } from "@vercel/og";
import { CSSProperties } from "react";
import getData, { countVotes, getSurveyResponses, groupTies } from "@/utility";
import { CountedVotes } from "@/types";

export const runtime = "edge";

function OGImage({ place, charaData }: { place: number; charaData: any[] }) {
  const rawVotes = getSurveyResponses();
  const countedVotes = countVotes("fave_chara");
  const groupedVotes = groupTies(countedVotes);

  const group: CountedVotes[] = groupedVotes[place.toString()];

  const containerStyles: CSSProperties = {
    backgroundImage: "linear-gradient(to left, #ddd6ff 45%, #f5f4fa 45%)",
    color: "#131038",
    display: "flex",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  };

  const leftSide: CSSProperties = {
    display: "flex",
    flexFlow: "column nowrap",
    flexBasis: "45%",
  };

  const rightSide: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
  };

  const headingContainerStyles: CSSProperties = {
    marginTop: "3%",
    display: "flex",
    height: "auto",
    backgroundColor: "#635caf",
    borderRadius: "0px 10px 10px 0px",
    padding: "2%",
  };

  const headingStyles: CSSProperties = {
    margin: 0,
    fontFamily: "SpaceMono",
    color: "#fff",
    fontSize: "2.5rem",
  };

  const chartContainerStyles: CSSProperties = {
    width: "90%",
    display: "flex",
    flexFlow: "column nowrap",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    marginLeft: "2%",
  };

  const chartStyles: CSSProperties = {
    width: "100%",
    display: "flex",
    alignItems: "center",
  };

  const chartLabelStyles: CSSProperties = {
    width: "90%",
    minHeight: 20,
    display: "flex",
    alignItems: "center",
    gap: 30,
    fontFamily: "Inter",
  };

  const adStyles: CSSProperties = {
    display: "flex",
    flexFlow: "column nowrap",
    boxSizing: "border-box",
    fontSize: "1.5rem",
  };

  const COLORS: string[] = [
    "#78821d",
    "#8a961d",
    "#8e9c19",
    "#9cab15",
    "#a9ba11",
  ];
  const OTHER_COLOR: string = "#cecae3";

  const chartData = [
    ...group,
    {
      chara_id: 0,
      count: rawVotes.length - group[0].count * group.length,
    },
  ];

  return (
    <div style={containerStyles}>
      <div style={leftSide}>
        <div style={headingContainerStyles}>
          <h1 style={headingStyles}>my fave is in {place}th place!</h1>
        </div>
        <p
          style={{ fontFamily: "Inter", fontSize: "1.7rem", paddingLeft: "2%" }}
        >
          {group.map((chara: CountedVotes, index: number) => (
            <>
              <strong
                style={{
                  color: "#6b65a8",
                  fontFamily: "Inter Bold",
                  marginRight: 5,
                  marginLeft: index > 0 ? 3 : 0,
                }}
              >
                {
                  charaData.filter(
                    (ch: any) => ch.character_id === chara.chara_id,
                  )[0].first_name
                }
              </strong>
              {group.length > 2 && index < group.length - 2
                ? ", "
                : group.length > 2 && index < group.length - 1
                ? ", and "
                : group.length === 2 && index < group.length - 1
                ? " and "
                : ""}
            </>
          ))}
          {group.length === 2 ? " both " : group.length > 2 ? " all " : " "}
          received {group[0].count} votes!
        </p>
        <div style={chartContainerStyles}>
          <div style={chartStyles}>
            {chartData.map((value: CountedVotes, index: number) => {
              return (
                <div
                  key={value.chara_id}
                  style={{
                    width: `${(value.count / rawVotes.length) * 100}%`,
                    height: 50,
                    backgroundColor:
                      value.chara_id > 0 ? COLORS[index] : OTHER_COLOR,
                    borderTopLeftRadius: index === 0 ? 5 : 0,
                    borderTopRightRadius:
                      index === chartData.length - 1 ? 5 : 0,
                    borderBottomLeftRadius: index === 0 ? 5 : 0,
                    borderBottomRightRadius:
                      index === chartData.length - 1 ? 5 : 0,
                  }}
                ></div>
              );
            })}
          </div>
          <div style={chartLabelStyles}>
            {chartData.map((value: CountedVotes, index: number) => (
              <div
                key={value.chara_id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    backgroundColor:
                      value.chara_id > 0 ? COLORS[index] : OTHER_COLOR,
                  }}
                ></div>
                <div style={{ fontSize: "1.5rem" }}>
                  {value.chara_id === 0
                    ? "Other"
                    : charaData.filter(
                        (ch: any) => ch.character_id === value.chara_id,
                      )[0].first_name}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={adStyles}>
          <p
            style={{
              fontFamily: "Inter Bold",
              margin: 0,
              marginLeft: "2%",
              fontSize: "1.2rem",
              color: "#6b65a8",
            }}
          >
            where did your fave place?
          </p>
          <p
            style={{
              backgroundColor: "#ddd6ff",
              color: "#8f81d4",
              padding: "2%",
              textDecoration: "underline",
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            https://hellogirls.info/projects/survey/2023/hall-of-fame
          </p>
        </div>
      </div>
      <div style={rightSide}>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "flex-end",
            gap: -400 + group.length * 50,
          }}
        >
          {group.map((chara: CountedVotes) => (
            <img
              src={`https://assets.hellogirls.info/renders/character_full1_${chara.chara_id}.png`}
              key={chara.chara_id}
              alt="chara"
              height={1200}
              style={{
                filter: "drop-shadow(5px 5px 0px #f5f4fa)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function GET(req: Request) {
  // const { hash } = new URL(request.url);
  const spaceMonoData = await fetch(
    "https://assets.hellogirls.info/fonts/SpaceMono-Bold.ttf",
  ).then((res) => res.arrayBuffer());
  const interData = await fetch(
    "https://assets.hellogirls.info/fonts/Inter-Regular.ttf",
  ).then((res) => res.arrayBuffer());
  const interBoldData = await fetch(
    "https://assets.hellogirls.info/fonts/Inter-Bold.ttf",
  ).then((res) => res.arrayBuffer());
  const charaDataRes = await getData(
    "https://tl.data.ensemble.moe/en/characters.json",
  );

  const { data } = charaDataRes;

  const REQ_URL = new URL(req.url);
  const { hash } = REQ_URL;

  console.log(REQ_URL);

  return new ImageResponse(
    <OGImage place={parseInt(hash)} charaData={data} />,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "SpaceMono",
          data: spaceMonoData,
        },
        {
          name: "Inter",
          data: interData,
        },
        {
          name: "Inter Bold",
          data: interBoldData,
        },
      ],
    },
  );
}
