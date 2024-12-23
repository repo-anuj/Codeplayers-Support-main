import React, { useState, useRef } from "react";
import { Accordion, AccordionItem, Collapse } from "reactstrap";
import classnames from "classnames";
import CPVoucherNumDisplayCard from "../CPVouchers/CPVoucherNumDisplayCard";

// Function to get distinct values based on a key
function getDistinctValues(data, key) {
  const values = [];

  data.forEach((item) => {
    const keys = key.split(".");
    let value = item;

    for (let k of keys) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        value = value[k];
      } else if (Array.isArray(value)) {
        // Handle arrays in the path
        value = value
          .map((v) => {
            if (v && typeof v === "object") {
              return v[k];
            }
            return undefined;
          })
          .filter((v) => v !== undefined);
      } else {
        value = undefined;
      }
    }

    // Flatten the array of values if necessary and filter out undefined values
    if (Array.isArray(value)) {
      values.push(...value);
    } else if (value !== undefined) {
      values.push(value);
    }
  });

  // Filter out undefined values and return distinct values
  return [...new Set(values.filter((value) => value !== undefined))];
}

const CPVoucherRegisterAccordian = ({ data, groupBy }) => {
  if (data) {
    const distinctValues = getDistinctValues(data, groupBy);
    const [activeIndex, setActiveIndex] = useState(null);
    const accordionRefs = useRef([]);

    const toggleAccordion = (index) => {
      if (activeIndex === index) {
        setActiveIndex(null);
      } else {
        setActiveIndex(index);
      }
    };

    return (
      <div style={{ marginLeft: "-24px", marginRight: "-24px" }}>
        {/* <Accordion
          className="lefticon-accordion custom-accordionwithicon accordion-border-box"
          id="accordionlefticon"
        > */}
        <Accordion
          className="custom-accordionwithicon accordion-fill-primary accordion-border-box"
          id="accordionFill"
        >
          {distinctValues.map((value, index) => (
            <AccordionItem
              key={index}
              ref={(el) => (accordionRefs.current[index] = el)}
              style={{ width: "100%" }}
            >
              <h3 className="accordion-header" id={`accordion-header-${index}`}>
                <button
                  className={classnames("accordion-button", {
                    collapsed: activeIndex !== index,
                  })}
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  // style={{ cursor: "pointer" }}
                >
                  {value}
                </button>
              </h3>

              <Collapse isOpen={activeIndex === index}>
                <div
                  className="accordion-content"
                  style={{
                    backgroundColor: "#ebebeb",
                    border: "1px solid #ccc",
                    maxHeight: "615px", // Fixed height for the content
                    overflowY: "auto", // Scrollbar if content exceeds maxHeight
                    boxSizing: "border-box",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                  }}
                >
                  {data
                    .filter((item) => {
                      if (groupBy === "item.particulars") {
                        return item.item.some((nestedItem) => {
                          const keys = groupBy.split(".");
                          let nestedValue = nestedItem;
                          for (let k of keys) {
                            if (nestedValue[k] === undefined) {
                            } else {
                              nestedValue = nestedValue[k];
                            }
                          }
                          return nestedValue === value;
                        });
                      }
                      const keys = groupBy.split(".");
                      let itemValue = item;
                      for (let k of keys) {
                        itemValue = itemValue[k];
                      }
                      return itemValue === value;
                    })
                    .map((filteredItem, i) => (
                      <CPVoucherNumDisplayCard key={i} voucher={filteredItem} />
                    ))}
                </div>
              </Collapse>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
  }

  return null;
};

export default CPVoucherRegisterAccordian;

// import React, { useState, useRef } from "react";
// import { Accordion, AccordionItem, Collapse } from "reactstrap";
// import classnames from "classnames";
// import CPVoucherNumDisplayCard from "../CPVouchers/CPVoucherNumDisplayCard";

// // Function to get distinct values based on a key
// function getDistinctValues(data, key) {
//   const values = [];

//   data.forEach((item) => {
//     const keys = key.split(".");
//     let value = item;

//     for (let k of keys) {
//       if (value && typeof value === "object" && !Array.isArray(value)) {
//         value = value[k];
//       } else if (Array.isArray(value)) {
//         // Handle arrays in the path
//         value = value
//           .map((v) => {
//             if (v && typeof v === "object") {
//               return v[k];
//             }
//             return undefined;
//           })
//           .filter((v) => v !== undefined);
//       } else {
//         value = undefined;
//       }
//     }

//     // Flatten the array of values if necessary and filter out undefined values
//     if (Array.isArray(value)) {
//       values.push(...value);
//     } else if (value !== undefined) {
//       values.push(value);
//     }
//   });

//   // Filter out undefined values and return distinct values
//   return [...new Set(values.filter((value) => value !== undefined))];
// }

// const CPVoucherRegisterAccordian = ({ data, groupBy }) => {
//   if (data) {
//     const distinctValues = getDistinctValues(data, groupBy);
//     const [activeIndex, setActiveIndex] = useState(null);
//     const accordionRefs = useRef([]);

//     const toggleAccordion = (index) => {
//       if (activeIndex === index) {
//         setActiveIndex(null);
//       } else {
//         setActiveIndex(index);
//       }
//     };

//     return (
//       <div>
//         <Accordion
//           className="lefticon-accordion custom-accordionwithicon accordion-border-box"
//           id="accordionlefticon"
//         >
//           {distinctValues.map((value, index) => (
//             <AccordionItem
//               key={index}
//               ref={(el) => (accordionRefs.current[index] = el)}
//               style={{ width: "100%" }}
//             >
//               <h2 className="accordion-header" id={`accordion-header-${index}`}>
//                 <button
//                   className={classnames("accordion-button", {
//                     collapsed: activeIndex !== index,
//                   })}
//                   type="button"
//                   onClick={() => toggleAccordion(index)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {value}
//                 </button>
//               </h2>

//               <Collapse isOpen={activeIndex === index}>
//                 <div
//                   className="accordion-content"
//                   style={{
//                     // padding: "10px",
//                     backgroundColor: "#F2F2F7",
//                     border: "1px solid #ccc",
//                     width: "100%", // Fixed width for the content
//                     maxHeight: "700px", // Fixed height for the content
//                     overflowY: "auto", // Scrollbar if content exceeds maxHeight
//                     boxSizing: "border-box",
//                   }}
//                 >
//                   {data
//                     .filter((item) => {
//                       const keys = groupBy.split(".");
//                       let itemValue = item;
//                       for (let k of keys) {
//                         itemValue = itemValue[k];
//                       }
//                       return itemValue === value;
//                     })
//                     .map((filteredItem, i) => (
//                       <CPVoucherNumDisplayCard key={i} voucher={filteredItem} />
//                     ))}
//                 </div>
//               </Collapse>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </div>
//     );
//   }

//   return null;
// };

// export default CPVoucherRegisterAccordian;
