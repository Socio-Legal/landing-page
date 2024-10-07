/* eslint-disable @next/next/no-img-element */
import { Icons as SttokIcons } from "@/components/icons";
import { Icons } from "@/components/animated/icons";

export const beamDefault = [
  <Icons.user key="user" />,
  <SttokIcons.logoMin key="sttok" />,
  <Icons.googleDrive key="drive" />,
  <Icons.googleDocs key="docs" />,
  <Icons.messenger key="messenger" />,
  <Icons.whatsapp key="whatsapp" />,
];

export const beamShareholderMeeting = [
  <Icons.user key="user" />,
  <SttokIcons.logoMin key="sttok" />,
  <img
    key="beam-meeting-01"
    src="https://www.sttok.com/wp-content/uploads/2020/08/ud-testimonial-03.jpg"
    alt="beam meeting 01"
    width={60}
    height={60}
    className="rounded-full"
  />,
  <img
    key="beam-meeting-02"
    src="https://www.sttok.com/wp-content/uploads/2019/11/testimonial-02.jpg"
    alt="beam meeting 02"
    width={60}
    height={60}
    className="rounded-full"
  />,
  <img
    key="beam-meeting-03"
    src="https://www.sttok.com/wp-content/uploads/2019/12/team-04.jpg"
    alt="beam meeting 03"
    width={60}
    height={60}
    className="rounded-full"
  />,
  <img
    key="beam-meeting-04"
    src="https://www.sttok.com/wp-content/uploads/2019/12/team-02.jpg"
    alt="beam meeting 04"
    width={60}
    height={60}
    className="rounded-full"
  />,
];
