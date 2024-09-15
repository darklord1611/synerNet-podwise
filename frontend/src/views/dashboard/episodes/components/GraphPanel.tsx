// Chakra imports
import { Button, Flex, HStack, Icon, Image, Link, Text, useColorModeValue, VStack } from '@chakra-ui/react';

// Assets
import { useEffect, useRef, useState } from 'react';
import { Markmap } from 'markmap-view';
import { transformer } from './markmap';
import { Toolbar } from 'markmap-toolbar';
import React from 'react';
import 'assets/css/tree.css'

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
    points: Points[];
}

type Points = {
    title: string;
    points: Points[];
}

const jsonData: GraphData[] = [
    {
        "keypoint": {
            "title": "Chip Wilson and the Founding of Lululemon",
            "timestamp": 0,
            "points": [
                {
                    "title": "Early Life and Career",
                    "points": [
                        {
                            "title": "Growing Up in Calgary",
                            "points": [
                                {
                                    "title": "Athletic Background",
                                    "points": []
                                },
                                {
                                    "title": "Influence of Mother's Sewing",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "First Job at an Oil Company",
                            "points": [
                                {
                                    "title": "Working on the Alaska Oil Pipeline",
                                    "points": []
                                },
                                {
                                    "title": "Earning a Significant Amount of Money",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Founding of West Beach and Early Success",
                    "points": [
                        {
                            "title": "Creating Baggy Shorts for Men",
                            "points": []
                        },
                        {
                            "title": "Initial Rejection by Department Stores",
                            "points": []
                        },
                        {
                            "title": "Setting Up a Lemonade Stand to Sell Shorts",
                            "points": []
                        },
                        {
                            "title": "Partnering with Others to Expand the Business",
                            "points": []
                        }
                    ]
                },
                {
                    "title": "Expansion into Snowboarding and Wholesale",
                    "points": [
                        {
                            "title": "Seeing the Potential of Snowboarding",
                            "points": []
                        },
                        {
                            "title": "Designing and Manufacturing Snowboarding Apparel",
                            "points": []
                        },
                        {
                            "title": "Challenges with Wholesale Business",
                            "points": []
                        }
                    ]
                },
                {
                    "title": "Selling West Beach and Transition to Lululemon",
                    "points": [
                        {
                            "title": "Selling the Company Due to Financial Struggles",
                            "points": []
                        },
                        {
                            "title": "Walking Away with a Limited Amount of Money",
                            "points": []
                        },
                        {
                            "title": "Transitioning to a New Venture",
                            "points": []
                        }
                    ]
                }
            ]
        }
    },
    {
        "keypoint": {
            "title": "The Birth of Lululemon",
            "timestamp": 0,
            "points": [
                {
                    "title": "The Inspiration",
                    "points": [
                        {
                            "title": "Yoga Class Experience",
                            "points": [
                                {
                                    "title": "Observing Fashion Trends",
                                    "points": []
                                },
                                {
                                    "title": "Noticing the Lack of Technical Clothing",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Extrapolating the Trend",
                            "points": [
                                {
                                    "title": "Comparing to Surf, Skate, and Snowboarding",
                                    "points": []
                                },
                                {
                                    "title": "Predicting the Growth of Yoga",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "The Conceptualization of Lululemon",
                    "points": [
                        {
                            "title": "Identifying the Target Market",
                            "points": [
                                {
                                    "title": "Twenty-Two to Thirty-Five Year Old Women",
                                    "points": []
                                },
                                {
                                    "title": "Single, Professional, and Athletic Women",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Seeking Advice and Feedback",
                            "points": [
                                {
                                    "title": "Consulting with Yoga Instructor Filma Stang",
                                    "points": []
                                },
                                {
                                    "title": "Using Her as a Sounding Board and Creative Source",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "The First Steps in Starting the Business",
                    "points": [
                        {
                            "title": "Using Previous Experience and Knowledge",
                            "points": []
                        },
                        {
                            "title": "Sourcing Materials and Creating Products",
                            "points": []
                        }
                    ]
                }
            ]
        }
    },
    {
        "keypoint": {
            "title": "Lululemon's Founding and Early Growth",
            "timestamp": 0,
            "points": [
                {
                    "title": "Problem Identification and Solution",
                    "points": [
                        {
                            "title": "Athletic Wear Issues",
                            "points": [
                                {
                                    "title": "Rashing and Discomfort",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Innovative Fabric Technology",
                            "points": [
                                {
                                    "title": "Flat Seaming and Moisture Wicking",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Business Strategy and Launch",
                    "points": [
                        {
                            "title": "Combining Function and Fashion",
                            "points": []
                        },
                        {
                            "title": "Initial Store and Marketing Efforts",
                            "points": [
                                {
                                    "title": "Second-Floor Store in Vancouver",
                                    "points": []
                                },
                                {
                                    "title": "Yoga Classes and Word-of-Mouth Marketing",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Growth and Expansion",
                    "points": [
                        {
                            "title": "First Store Outside of Vancouver",
                            "points": [
                                {
                                    "title": "Toronto Store",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "US Expansion",
                            "points": [
                                {
                                    "title": "Santa Monica Store",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "International Expansion",
                            "points": [
                                {
                                    "title": "Melbourne, Australia Store",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Marketing and Branding",
                    "points": [
                        {
                            "title": "Logo and Branding Strategy",
                            "points": []
                        },
                        {
                            "title": "Stunts and Promotions",
                            "points": [
                                {
                                    "title": "Free Outfit Promotion",
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
            "title": "Scaling the Business and Bringing in Outside Investors",
            "timestamp": 0,
            "points": [
                {
                    "title": "Rapid Growth and Limited Cash Flow",
                    "points": [
                        {
                            "title": "High Profit Margins",
                            "points": []
                        },
                        {
                            "title": "Limited Cash Flow Despite High Profits",
                            "points": []
                        }
                    ]
                },
                {
                    "title": "Decision to Bring in Outside Investors",
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
                },
                {
                    "title": "Consequences of Bringing in Outside Investors",
                    "points": [
                        {
                            "title": "Tension and Conflicting Interests",
                            "points": []
                        },
                        {
                            "title": "Loss of Control and Autonomy",
                            "points": []
                        }
                    ]
                },
                {
                    "title": "New Roles and Responsibilities",
                    "points": [
                        {
                            "title": "Transition from CEO to Chairman",
                            "points": []
                        },
                        {
                            "title": "Focus on Innovation and Quality",
                            "points": []
                        }
                    ]
                }
            ]
        }
    },
    {
        "keypoint": {
            "title": "Lululemon's Early Days and Going Public",
            "timestamp": 0,
            "points": [
                {
                    "title": "Vision and Going Public",
                    "points": [
                        {
                            "title": "Founder's Long-Term Vision vs. Company's Short-Term Vision",
                            "points": []
                        },
                        {
                            "title": "Going Public in 2007",
                            "points": [
                                {
                                    "title": "Hot Stock",
                                    "points": []
                                },
                                {
                                    "title": "Selling a Chunk of Stock Early On",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Loss of Control and Advice from Advisors",
                    "points": [
                        {
                            "title": "Selling 48% of Stock to Private Equity",
                            "points": [
                                {
                                    "title": "Loss of Control of Board Seats",
                                    "points": []
                                }
                            ]
                        },
                        {
                            "title": "Advice to Sell More Shares",
                            "points": [
                                {
                                    "title": "Techniques to Dissipate Founder's Power",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Lululemon's Success",
                    "points": [
                        {
                            "title": "Company's Rapid Growth",
                            "points": []
                        },
                        {
                            "title": "Lululemon's Ubiquity",
                            "points": []
                        }
                    ]
                }
            ]
        }
    },
    {
        "keypoint": {
            "title": "Chip Wilson's Journey with Lululemon",
            "timestamp": 0,
            "points": [
                {
                    "title": "Growth and Success",
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
                    "title": "Challenges and Controversies",
                    "points": [
                        {
                            "title": "Lululemon's Recall in 2013",
                            "points": [
                                {
                                    "title": "Sheer Pants Controversy",
                                    "points": []
                                },
                                {
                                    "title": "Chip Wilson's Comments",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Personal Values and Priorities",
                    "points": [
                        {
                            "title": "Family and Passion for Athletic Clothing",
                            "points": []
                        },
                        {
                            "title": "Frugality and Humility",
                            "points": []
                        }
                    ]
                }
            ]
        }
    },
    {
        "keypoint": {
            "title": "Lululemon Controversy",
            "timestamp": 0,
            "points": [
                {
                    "title": "Background of the Controversy",
                    "points": [
                        {
                            "title": "Frustration with the Board",
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
                            "title": "Pilling Issue with Lululemon Fabric",
                            "points": []
                        },
                        {
                            "title": "Misinterpretation of Comments",
                            "points": [
                                {
                                    "title": "Original Statement",
                                    "points": []
                                },
                                {
                                    "title": "Perceived Meaning",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Real Issue with Lululemon Pants",
                    "points": [
                        {
                            "title": "Sewing Technique and Fabric",
                            "points": []
                        },
                        {
                            "title": "Women Buying Smaller Sizes",
                            "points": []
                        }
                    ]
                }
            ]
        }
    },
    {
        "keypoint": {
            "title": "Chip Wilson's Experience with Lululemon",
            "timestamp": 0,
            "points": [
                {
                    "title": "Depression and Liability",
                    "points": [
                        {
                            "title": "Removal as Chairman",
                            "points": []
                        },
                        {
                            "title": "Feeling of Liability",
                            "points": [
                                {
                                    "title": "Perception of Being a Liability",
                                    "points": []
                                },
                                {
                                    "title": "Devastating Consequences",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Reflection and Regret",
                    "points": [
                        {
                            "title": "Poor Choice of Words",
                            "points": []
                        },
                        {
                            "title": "Wish to Take it Back",
                            "points": []
                        }
                    ]
                },
                {
                    "title": "Loss of Control and Success",
                    "points": [
                        {
                            "title": "Building a Company",
                            "points": []
                        },
                        {
                            "title": "Success and Loss of Control",
                            "points": [
                                {
                                    "title": "Many Fathers of Success",
                                    "points": []
                                },
                                {
                                    "title": "Orphan of Failure",
                                    "points": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "title": "Future Plans and Priorities",
                    "points": [
                        {
                            "title": "No Plans to Start Another Company",
                            "points": []
                        },
                        {
                            "title": "Prioritizing Family and Coaching",
                            "points": []
                        }
                    ]
                },
                {
                    "title": "Success and Luck",
                    "points": [
                        {
                            "title": "Passion and Drive",
                            "points": []
                        },
                        {
                            "title": "Luck and Meeting Market Demand",
                            "points": []
                        }
                    ]
                }
            ]
        }
    }
]

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

const transformedMarkdown = generateMarkdown(jsonData);

console.log(transformedMarkdown);

export default function TreeGraph(props: { data: any}) {
    const { data } = props;
    const brandColor = useColorModeValue('brand.500', 'brand.400');
    const [value, setValue] = useState(transformedMarkdown);
    // Ref for SVG element
    const refSvg = useRef<SVGSVGElement>();
    // Ref for markmap object
    const refMm = useRef<Markmap>();
    // Ref for toolbar wrapper
    const refToolbar = useRef<HTMLDivElement>();

    useEffect(() => {
        // Create markmap and save to refMm
        if (refMm.current) return;
        const mm = Markmap.create(refSvg.current);
        console.log('create', refSvg.current);
        refMm.current = mm;
    }, [refSvg.current]);

    useEffect(() => {
        // Update data for markmap once value is changed
        const mm = refMm.current;
        if (!mm) return;
        const { root } = transformer.transform(value);
        mm.setData(root);
        mm.fit();
    }, [refMm.current, value]);

    return (
            <React.Fragment>
                <svg className="flex-1" ref={refSvg} width='100%' height='250px' />
            </React.Fragment>
        );
}
