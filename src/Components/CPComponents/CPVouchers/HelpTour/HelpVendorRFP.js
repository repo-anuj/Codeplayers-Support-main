const HelpVendorRFP = [
  {
    id: "intro",
    attachTo: { element: "#Purchase-Details", on: "bottom" },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    buttons: [
      {
        classes: "btn btn-success",
        text: "Next",
        action() {
          return this.next();
        },
      },
    ],
    title: "Vendor Quotation Details",
    text: ["Enter your Quotation Number and Date by clicking here."],
  },

  {
    id: "intro1",
    attachTo: { element: "#Item-Zero", on: "bottom" },

    buttons: [
      {
        text: "Back",
        classes: "btn btn-light",
        action() {
          return this.back();
        },
      },
      {
        text: "Next",
        classes: "btn btn-success",
        action() {
          return this.next();
        },
      },
    ],
    title: "Enter Item Rate",
    text: "You can enter Item Rate and Other Details by clicking here. Likewise you can enter details for all items.",
  },
  {
    id: "intro2",
    attachTo: { element: "#input-discount", on: "bottom" },
    buttons: [
      {
        text: "Back",
        classes: "btn btn-light",
        action() {
          return this.back();
        },
      },
      {
        text: "Next",
        classes: "btn btn-success",
        action() {
          return this.next();
        },
      },
    ],
    title: "Enter Discount",
    text: "You may enter Discount and Discount's GST details by clicking here.",
  },
  {
    id: "intro3",
    attachTo: { element: "#input-freight", on: "bottom" },
    buttons: [
      {
        text: "Back",
        classes: "btn btn-light",
        action() {
          return this.back();
        },
      },
      {
        text: "Next",
        classes: "btn btn-success",
        action() {
          return this.next();
        },
      },
    ],
    title: "Enter Freight",
    text: "You may enter Freight and Freight's GST details by clicking here.",
  },
  {
    id: "intro4",
    attachTo: { element: "#final-submit", on: "bottom" },
    buttons: [
      {
        text: "Back",
        classes: "btn btn-light",
        action() {
          return this.back();
        },
      },
      {
        text: "Thank you !",
        classes: "btn btn-primary",
        action() {
          return this.complete();
        },
      },
    ],
    title: "Submit Quotation !",
    text: "Click here to Submit Quotation.",
  },
];

export default HelpVendorRFP;
