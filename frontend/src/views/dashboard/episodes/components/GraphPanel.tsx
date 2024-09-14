// Chakra imports
import { Button, Flex, HStack, Icon, Image, Link, Text, useColorModeValue, VStack } from '@chakra-ui/react';

// Assets
import { useEffect, useRef, useState } from 'react';
import { Markmap } from 'markmap-view';
import { transformer } from './markmap';
import { Toolbar } from 'markmap-toolbar';
import React from 'react';
import 'assets/css/tree.css'
import { Transformer } from 'markmap-lib';
import Timestamp from './Timestamp';
import { createRoot } from 'react-dom/client'

// const initValue = `# Podcast Notes

// - Introduction
//     - Busy weekend
//         - Competitions
//             - Olympics
//                 - Closing ceremony
//                     - Final events
//                     - High stakes 
//         - Global updates
//             - Ukraine-Russia conflict
//                 - Escalation
//                 - Strategic moves

// - Ukraine-Russia Conflict
//     - Ukrainian Incursion
//         - Cross-border attack
// - U.S. Political Campaigns
//     - Harris-Walz Tour
// `;
type GraphData = {
    keypoint: KeyPoint;
}

type KeyPoint = {
    title: string;
    timestamp: number;
    points: InnerPoints[];
}

type InnerPoints = {
    title: string;
    timestamp: number;
    points: Points[];
}

type Points = {
    title: string;
    points: Points[];
}

const jsonData: GraphData[] = [
    {
        "keypoint": {
            "title": "The Founding and Early Days of Lululemon",
            "timestamp": 0.3998,
            "points": [
                {
                    "title": "Chip Wilson and the Founding of Lululemon",
                    "timestamp": 0.3998,
                    "points": [
                        {
                            "title": "Early Life and Career",
                            "points": [
                                {
                                    "title": "Growing up in Calgary, Canada",
                                    "points": []
                                },
                                {
                                    "title": "Working on the Alaska oil pipeline",
                                    "points": [
                                        {
                                            "title": "Earned $175,000 at the age of 19",
                                            "points": []
                                        }
                                    ]
                                },
                                {
                                    "title": "Starting his own business",
                                    "points": [
                                        {
                                            "title": "Goal to be in his own business by age 30",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "West Beach and the Early Days of Athleisure",
                            "points": [
                                {
                                    "title": "Creating loud, baggy shorts for men",
                                    "points": [
                                        {
                                            "title": "Inspired by his mother's sewing and his own athletic background",
                                            "points": []
                                        }
                                    ]
                                },
                                {
                                    "title": "Selling shorts at a mall in Calgary",
                                    "points": [
                                        {
                                            "title": "Made $1,000 a day selling shorts",
                                            "points": []
                                        }
                                    ]
                                },
                                {
                                    "title": "Expanding to other markets",
                                    "points": [
                                        {
                                            "title": "Trade shows in Singapore and Munich",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "Snowboarding and the Growth of West Beach",
                            "points": [
                                {
                                    "title": "Seeing the potential of snowboarding",
                                    "points": [
                                        {
                                            "title": "Predicted it would be bigger than surfing and skateboarding",
                                            "points": []
                                        }
                                    ]
                                },
                                {
                                    "title": "Designing and manufacturing snowboard apparel",
                                    "points": [
                                        {
                                            "title": "Making clothing in Calgary with Italian couture designers",
                                            "points": []
                                        }
                                    ]
                                },
                                {
                                    "title": "Challenges with wholesale business",
                                    "points": [
                                        {
                                            "title": "Losing money in wholesale, but making it up in retail",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "Selling West Beach and the Founding of Lululemon",
                            "points": [
                                {
                                    "title": "Selling West Beach to a public company",
                                    "points": [
                                        {
                                            "title": "Walked away with $800,000 after taxes",
                                            "points": []
                                        }
                                    ]
                                },
                                {
                                    "title": "Founding Lululemon",
                                    "points": [
                                        {
                                            "title": "Creating a new brand focused on yoga and athleisure",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "The Birth of Lululemon",
                    "timestamp": 934.9907,
                    "points": [
                        {
                            "title": "The Inspiration",
                            "points": [
                                {
                                    "title": "Attending a Yoga Class",
                                    "points": [
                                        {
                                            "title": "Noticing the Fashion Trend",
                                            "points": []
                                        },
                                        {
                                            "title": "Extrapolating the Growth of Yoga",
                                            "points": []
                                        }
                                    ]
                                },
                                {
                                    "title": "Spotting a Trend",
                                    "points": [
                                        {
                                            "title": "Comparing to Surf, Skate, and Snowboarding",
                                            "points": []
                                        },
                                        {
                                            "title": "Recognizing the Potential of Yoga",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "The Decision to Start a Business",
                            "points": [
                                {
                                    "title": "Using Past Experience",
                                    "points": [
                                        {
                                            "title": "Applying Knowledge from West Beach",
                                            "points": []
                                        }
                                    ]
                                },
                                {
                                    "title": "Identifying a New Market",
                                    "points": [
                                        {
                                            "title": "The Rise of the Female Professional",
                                            "points": []
                                        },
                                        {
                                            "title": "The Need for Stylish Athletic Clothing",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "Taking Action",
                            "points": [
                                {
                                    "title": "Seeking Advice",
                                    "points": [
                                        {
                                            "title": "Consulting with a Yoga Instructor",
                                            "points": []
                                        }
                                    ]
                                },
                                {
                                    "title": "Using Available Resources",
                                    "points": [
                                        {
                                            "title": "Utilizing Sourcing Material Knowledge",
                                            "points": []
                                        },
                                        {
                                            "title": "Investing Initial Capital",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Lululemon's Founding and Early Growth",
                    "timestamp": 1272.4049,
                    "points": [
                        {
                            "title": "The Problem with Athletic Wear",
                            "points": [
                                {
                                    "title": "Rashes and Discomfort",
                                    "points": []
                                },
                                {
                                    "title": "Lack of Moisture-Wicking and Anti-Stink Technology",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "The Founding of Lululemon",
                            "points": [
                                {
                                    "title": "Inspiration from Japan",
                                    "points": [
                                        {
                                            "title": "Flat-Seam Machines",
                                            "points": []
                                        }
                                    ]
                                },
                                {
                                    "title": "Combining Function and Fashion",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Early Challenges and Risks",
                            "points": [
                                {
                                    "title": "Limited Funding",
                                    "points": []
                                },
                                {
                                    "title": "Unconventional Business Model",
                                    "points": [
                                        {
                                            "title": "Yoga Studio with a Boutique",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "The Name 'Lululemon'",
                            "points": [
                                {
                                    "title": "Inspiration from Japanese Trading Companies",
                                    "points": []
                                },
                                {
                                    "title": "Alliterations with 'L'",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Early Success and Growth",
                            "points": [
                                {
                                    "title": "First Store in Vancouver",
                                    "points": []
                                },
                                {
                                    "title": "Expansion to Toronto and the US",
                                    "points": [
                                        {
                                            "title": "Santa Monica Store",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "Marketing and Branding Strategies",
                            "points": [
                                {
                                    "title": "Word-of-Mouth and Breakeven Marketing",
                                    "points": []
                                },
                                {
                                    "title": "Unconventional Marketing Stunts",
                                    "points": [
                                        {
                                            "title": "Free Outfits for Naked Customers",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        "keypoint": {
            "title": "Challenges and Growth After Going Public",
            "timestamp": 2065.7627,
            "points": [
                {
                    "title": "Scaling a Business and Bringing in Outside Investors",
                    "timestamp": 2065.7627,
                    "points": [
                        {
                            "title": "Rapid Growth and Cash Flow Challenges",
                            "points": [
                                {
                                    "title": "Limited Cash Flow Despite Rapid Growth",
                                    "points": []
                                },
                                {
                                    "title": "Unique Business Model with Triple the Profit",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Seeking Outside Investors and Stepping Down as CEO",
                            "points": [
                                {
                                    "title": "Selling Half of the Company to Private Investors",
                                    "points": []
                                },
                                {
                                    "title": "Reasons for Seeking Outside Investors",
                                    "points": [
                                        {
                                            "title": "Desire for Advisors and Guidance",
                                            "points": []
                                        },
                                        {
                                            "title": "Fear of Losing Everything",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "New Role as Chairman and Chief Innovation Officer",
                            "points": [
                                {
                                    "title": "Focus on Innovation and Quality",
                                    "points": []
                                },
                                {
                                    "title": "Lack of Experience with Public Boards",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Tension with Outside Investors",
                            "points": [
                                {
                                    "title": "Different Expectations and Goals",
                                    "points": []
                                },
                                {
                                    "title": "Private Equity's Focus on Making Money for Investors",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Going Public and Losing Control of Lululemon",
                    "timestamp": 2257.304,
                    "points": [
                        {
                            "title": "Vision for Lululemon",
                            "points": [
                                {
                                    "title": "Long-term vision vs. short-term vision",
                                    "points": []
                                },
                                {
                                    "title": "Going public too quickly",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Selling Stock and Losing Board Seats",
                            "points": [
                                {
                                    "title": "Selling 48% of stock to private equity",
                                    "points": []
                                },
                                {
                                    "title": "Losing control of board seats",
                                    "points": []
                                },
                                {
                                    "title": "Not knowing how to negotiate for board seats",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Advice from Advisors",
                            "points": [
                                {
                                    "title": "Selling more shares to increase institutional investors",
                                    "points": []
                                },
                                {
                                    "title": "Techniques to dissipate founder's power",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Consequences of Losing Control",
                            "points": [
                                {
                                    "title": "Losing power to control the board",
                                    "points": []
                                },
                                {
                                    "title": "Founder moving into the background",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Lululemon's Success",
                            "points": [
                                {
                                    "title": "Company's rapid growth",
                                    "points": []
                                },
                                {
                                    "title": "Lululemon becoming a popular brand",
                                    "points": []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        "keypoint": {
            "title": "Addressing Controversy and Misinterpretation",
            "timestamp": 2329.9082,
            "points": [
                {
                    "title": "Lululemon's Growth and Challenges",
                    "timestamp": 2329.9082,
                    "points": [
                        {
                            "title": "Rapid Growth and Success",
                            "points": [
                                {
                                    "title": "Long-term Vision",
                                    "points": []
                                },
                                {
                                    "title": "Achieving Financial Security",
                                    "points": [
                                        {
                                            "title": "Becoming a Billionaire",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "Personal Motivations and Priorities",
                            "points": [
                                {
                                    "title": "Family and Passion for Athletic Clothing",
                                    "points": []
                                },
                                {
                                    "title": "Frugal Personal Life",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Challenges and Controversies",
                            "points": [
                                {
                                    "title": "Lululemon's Recall of Sheer Pants",
                                    "points": [
                                        {
                                            "title": "Chip Wilson's Controversial Statement",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Lululemon Controversy",
                    "timestamp": 2435.1401,
                    "points": [
                        {
                            "title": "Background of the Controversy",
                            "points": [
                                {
                                    "title": "CEO's Frustration with the Board",
                                    "points": []
                                },
                                {
                                    "title": "Quality Issues with Lululemon Pants",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "The Bloomberg Interview",
                            "points": [
                                {
                                    "title": "CEO's Comments on Pilling and Fabric",
                                    "points": []
                                },
                                {
                                    "title": "Misinterpretation of CEO's Comments",
                                    "points": [
                                        {
                                            "title": "Perceived Insult to Overweight Women",
                                            "points": []
                                        },
                                        {
                                            "title": "Actual Meaning of CEO's Comments",
                                            "points": []
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "Root Cause of the Problem",
                            "points": [
                                {
                                    "title": "Women Buying Smaller Sizes",
                                    "points": []
                                },
                                {
                                    "title": "Fabric and Sewing Technique Not Suitable for Smaller Sizes",
                                    "points": []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        "keypoint": {
            "title": "Lessons Learned and Life After Lululemon",
            "timestamp": 2575.7197,
            "points": [
                {
                    "title": "Chip Wilson's Experience with Lululemon",
                    "timestamp": 2575.7197,
                    "points": [
                        {
                            "title": "Depression and Removal as Chairman",
                            "points": [
                                {
                                    "title": "Feeling of Liability",
                                    "points": []
                                },
                                {
                                    "title": "Devastating Impact on Personal Life",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Reflection on Past Mistakes",
                            "points": [
                                {
                                    "title": "Poor Choice of Words",
                                    "points": []
                                },
                                {
                                    "title": "Willingness to Take it Back",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Loss of Control and Success",
                            "points": [
                                {
                                    "title": "Success Having Many Fathers",
                                    "points": []
                                },
                                {
                                    "title": "Vision for Lululemon's Future",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Future Plans and Priorities",
                            "points": [
                                {
                                    "title": "No Plans to Start Another Business",
                                    "points": []
                                },
                                {
                                    "title": "Enjoying Family Life and Coaching",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Success Factors",
                            "points": [
                                {
                                    "title": "Passion for Athletic Technical Product",
                                    "points": []
                                },
                                {
                                    "title": "Luck in Meeting Market Demand",
                                    "points": []
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }    
]

// Recursive function to convert JSON object to markdown format
// const transformToMarkdown = (data: Points, level = 0): string => {
//   const indentation = '    '.repeat(level); // Add indentation based on depth
//   let result = `${indentation}- ${data.title}\n`; // Add key with indentation and markdown bullet

//   if (data.points && data.points.length > 0) {
//     data.points.forEach((subPoint) => {
//       result += transformToMarkdown(subPoint, level + 1); // Recursively add children
//     });
//   }

//   return result;
// };

// // Transform the JSON data to markdown format
// const generateMarkdown = (jsonData: GraphData[]): string => {
//   let markdown = "# Podcast Notes\n\n";
//   jsonData.forEach(item => {
//     markdown += transformToMarkdown(item.keypoint);
//   });
//   return markdown;
// };

// const transformedMarkdown = generateMarkdown(jsonData);

// console.log(transformedMarkdown);

// const transformer = new Transformer();

export default function TreeGraph(props: { keypoints: any, onSeek?: (time: number) => void }) {
    const { keypoints, onSeek } = props;
    const brandColor = useColorModeValue('brand.500', 'brand.400');
    
    // Ref for SVG element
    const refSvg = useRef<SVGSVGElement>();
    // Ref for markmap object
    const refMm = useRef<Markmap>();
    // Ref for toolbar wrapper
    const refToolbar = useRef<HTMLDivElement>();

    // Recursive function to convert JSON object to markdown format
const transformToMarkdown = (data: Points, level = 0): string => {
    const indentation = '    '.repeat(level); // Add indentation based on depth
    let result = `${indentation}- ${data.title}\n`; // Add key with indentation and markdown bullet
  
    if (data.points && data.points.length > 0) {
      data.points.forEach((subPoint) => {
        result += transformToMarkdown(subPoint, level + 1); // Recursively add children
      });
    }
  
    return result;
  };
  
  // Transform the JSON data to markdown format
  const generateMarkdown = (jsonData: GraphData[]): string => {
    let markdown = "# Podcast Notes\n\n";
    jsonData.forEach(item => {
      markdown += transformToMarkdown(item.keypoint);
    });
    return markdown;
  };
  
  const transformedMarkdown = generateMarkdown(keypoints);
  
  console.log(transformedMarkdown);
  
const [value, setValue] = useState(transformedMarkdown);
    useEffect(() => {
        // Create markmap and save to refMm
        if (refMm.current) return;
        const mm = Markmap.create(refSvg.current, { initialExpandLevel: 3 });
        console.log('create', refSvg.current);
        refMm.current = mm;
    }, [refSvg.current]);

    useEffect(() => {
        // Update data for markmap once value is changed
        const mm = refMm.current;
        if (!mm) return;
        const { root } = transformer.transform(value);

        console.log('root', root)

            // Traverse the nodes and add custom components where needed
        // const traverseNodes = (node: ) => {
        //     if (node.content === 'timestamp') {
        //     node.content = `<div id="custom-node">${<Timestamp seconds={node.content}/>}</div>`;
        //     }
        //     if (node.children) {
        //     node.children.forEach(traverseNodes);
        //     }
        // };
        
        // traverseNodes(root);
        mm.setData(root);
        mm.fit();
        // setTimeout(() => {
        //     // Locate <g> elements with data-depth="1" or data-depth="2"
        //     const depth1Elements = document.querySelectorAll('g[data-depth="2"] foreignObject');
        //     const depth2Elements = document.querySelectorAll('g[data-depth="3"] foreignObject');
        //     const div1Elements = document.querySelectorAll('g[data-depth="2"] foreignObject div');
        //     const div2Elements = document.querySelectorAll('g[data-depth="3"] foreignObject div');
      
        //     depth1Elements.forEach((el, index) => {
        //         console.log(el)
        //         if (el) {
        //             // Set the new height for the <foreignObject>
        //             el.setAttribute('height', '50'); // Modify height as needed
        //         }
        //     });

        //     div1Elements.forEach((el, index) => {
        //         const foundElement = document.querySelectorAll('g[data-depth="3"] foreignObject div span');
        //         if (foundElement.length > 0) {
        //             return;
        //         }
        //         // Append custom content without clearing existing content
        //         const customElement = document.createElement('span');
        //         customElement.className = 'custom-node';
        //         el.appendChild(customElement); // Append a div where React can render the component
        //         const root = createRoot(customElement);
        //         root.render(<Timestamp seconds={100} onSeek={onSeek}/>);
        //     });

        //     depth2Elements.forEach((el, index) => {
        //         console.log(el)
        //         if (el) {
        //             // Set the new height for the <foreignObject>
        //             el.setAttribute('height', '50'); // Modify height as needed
        //         }
        //     });

            
        //     div2Elements.forEach((el, index) => {
        //         // Append custom content without clearing existing content
        //         const foundElement = document.querySelectorAll('g[data-depth="3"] foreignObject div span');
        //         if (foundElement.length > 0) {
        //             return;
        //         }
        //         const customElement = document.createElement('span');
        //         customElement.className = 'custom-node';
        //         el.appendChild(customElement); // Append a div where React can render the component
        //         const root = createRoot(customElement);
        //         root.render(<Timestamp seconds={200} onSeek={onSeek}/>);
        //     });
        //   }, 0);

    }, [refMm.current, value]);

    return (
            <React.Fragment>
                <svg className="flex-1" ref={refSvg} width='100%' height='500px'/>
            </React.Fragment>
        );
}
