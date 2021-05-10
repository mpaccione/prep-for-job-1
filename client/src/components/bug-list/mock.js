import moment from "moment"

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function formatDate(date){
    return moment(randomDate(new Date(2021, 4, 1), date)).format("MM-DD-YY")
}

export const MOCK_BUG_DATA = [
  {
    id: 0,  
    createdAt: formatDate(new Date()),
    title: "Mobile not responsive",
    description:
      "Some layouts issues on contact and about pages. Improper alignments and padding. See design ref.",
    complete: false,
    severity: "1",
  },
  { 
    id: 1,  
    createdAt: formatDate(new Date()),
    title: "Images need optimizing for faster load",
    description:
      "Long load times because hero banner is not using media queries for loading correct version.",
    complete: false,
    severity: "0",
  },
  {
    id: 2,  
    createdAt: formatDate(new Date()),
    title: "Mail server sometimes unresponsive",
    description:
      "Timeout issues with mail server reliability.",
    complete: false,
    severity: "2"
  },
  {
    id: 3,  
    createdAt: formatDate(new Date()),
    title: "Billing API down",
    description:
      "Unable to accept payments to the payment processor through the backend API.",
    complete: false,
    severity: "3"
  },
  {
    id: 4,  
    createdAt: formatDate(new Date()),
    title: "Need to move assets to CDN",
    description:
      "Assets need to be moved to a CDN for faster parallel loading.",
    complete: true,
    severity: "0"
  }
];
