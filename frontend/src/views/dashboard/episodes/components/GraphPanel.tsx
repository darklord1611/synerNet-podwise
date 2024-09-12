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
  timestamp: number;
  keypoint: NestedData;
}

type NestedData = {
  title: string;
  points: NestedData[];
}

const jsonData: GraphData[] = [
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Early Life and Career",
                "points": [
                    {
                        "title": "Chip Wilson's Childhood",
                        "points": [
                            {
                                "title": "Growing up in Calgary, Canada",
                                "points": []
                            },
                            {
                                "title": "Athletic background and influence of his parents",
                                "points": []
                            }
                        ]
                    },
                    {
                        "title": "First Job and Entrepreneurial Ventures",
                        "points": [
                            {
                                "title": "Working on the Alaska oil pipeline",
                                "points": []
                            },
                            {
                                "title": "Starting a clothing business with his wife",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "West Beach and the Birth of Athleisure",
                "points": [
                    {
                        "title": "Creating the First Products",
                        "points": [
                            {
                                "title": "Designing and manufacturing loud, baggy shorts",
                                "points": []
                            },
                            {
                                "title": "Quilting fabric to create reversible shorts",
                                "points": []
                            }
                        ]
                    },
                    {
                        "title": "Marketing and Sales Strategies",
                        "points": [
                            {
                                "title": "Setting up a lemonade stand to sell shorts",
                                "points": []
                            },
                            {
                                "title": "Expanding to trade shows and retail stores",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Snowboarding and the Growth of West Beach",
                "points": [
                    {
                        "title": "Entering the Snowboarding Market",
                        "points": [
                            {
                                "title": "Designing and manufacturing snowboarding apparel",
                                "points": []
                            },
                            {
                                "title": "Partnering with Italian couture designers",
                                "points": []
                            }
                        ]
                    },
                    {
                        "title": "Challenges and Decisions",
                        "points": [
                            {
                                "title": "Struggling with wholesale business and competition",
                                "points": []
                            },
                            {
                                "title": "Deciding to sell West Beach",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Post-West Beach and the Founding of Lululemon",
                "points": [
                    {
                        "title": "Financial Situation and Goals",
                        "points": [
                            {
                                "title": "Walking away with a limited amount of money",
                                "points": []
                            },
                            {
                                "title": "Failing to achieve financial independence by 40",
                                "points": []
                            }
                        ]
                    },
                    {
                        "title": "New Ventures and Opportunities",
                        "points": [
                            {
                                "title": "Exploring new business ideas and opportunities",
                                "points": []
                            },
                            {
                                "title": "Laying the groundwork for Lululemon",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "The Idea",
                "points": [
                    {
                        "title": "Inspiration from Yoga",
                        "points": [
                            {
                                "title": "Noticing a Trend",
                                "points": []
                            },
                            {
                                "title": "Extrapolating Growth",
                                "points": []
                            }
                        ]
                    },
                    {
                        "title": "Spotting a Market Opportunity",
                        "points": [
                            {
                                "title": "Demographic Shift",
                                "points": []
                            },
                            {
                                "title": "Growing Demand for Athletic Apparel",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Research and Planning",
                "points": [
                    {
                        "title": "Seeking Advice from a Yoga Instructor",
                        "points": []
                    },
                    {
                        "title": "Using Knowledge from Previous Ventures",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Starting the Business",
                "points": [
                    {
                        "title": "Using Existing Resources",
                        "points": []
                    },
                    {
                        "title": "Sourcing Materials",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "The Problem with Athletic Wear",
                "points": [
                    {
                        "title": "Rashes and Discomfort",
                        "points": []
                    },
                    {
                        "title": "Lack of Moisture-Wicking and Anti-Stink Properties",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "The Solution: Flat Seams and Moisture-Wicking Fabric",
                "points": [
                    {
                        "title": "Investing in $40,000 Machines for Flat Seams",
                        "points": []
                    },
                    {
                        "title": "Developing Moisture-Wicking and Anti-Stink Properties",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "The Birth of Lululemon",
                "points": [
                    {
                        "title": "Combining Function and Fashion",
                        "points": []
                    },
                    {
                        "title": "The Name 'Lululemon' and its Origins",
                        "points": [
                            {
                                "title": "Inspiration from Japanese Trading Companies",
                                "points": []
                            },
                            {
                                "title": "Alliterations with 'L' and 'Lemon'",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Overcoming Challenges and Launching the First Store",
                "points": [
                    {
                        "title": "Financial Struggles and Taking Risks",
                        "points": []
                    },
                    {
                        "title": "Combining Yoga Classes with Clothing Sales",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Expansion and Growth",
                "points": [
                    {
                        "title": "Opening the First Store Outside of Vancouver in Toronto",
                        "points": []
                    },
                    {
                        "title": "Entering the US Market with a Store in Santa Monica",
                        "points": []
                    },
                    {
                        "title": "Expanding to Melbourne, Australia",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Marketing and Branding Strategies",
                "points": [
                    {
                        "title": "Word-of-Mouth Marketing",
                        "points": []
                    },
                    {
                        "title": "Creating a Community with Yoga Classes and Events",
                        "points": []
                    },
                    {
                        "title": "Stunts and Promotions, such as the 'Naked' Event",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Rapid Business Growth",
                "points": [
                    {
                        "title": "Insufficient Cash Flow",
                        "points": []
                    },
                    {
                        "title": "High Profit Margins",
                        "points": [
                            {
                                "title": "Triple the Profit of Most People",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Seeking Outside Investors",
                "points": [
                    {
                        "title": "Selling Half of the Company",
                        "points": []
                    },
                    {
                        "title": "Reasons for Seeking Investors",
                        "points": [
                            {
                                "title": "Fear of Losing Everything",
                                "points": []
                            },
                            {
                                "title": "Desire for Advisors",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "New Roles and Responsibilities",
                "points": [
                    {
                        "title": "Stepping Down as CEO",
                        "points": []
                    },
                    {
                        "title": "Becoming Chairman and Chief Innovation Officer",
                        "points": [
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
            "timestamp": 100,
            "keypoint": {
                "title": "Challenges with Outside Investors",
                "points": [
                    {
                        "title": "Tension and Different Interests",
                        "points": []
                    },
                    {
                        "title": "Private Equity's Goal of Making Money",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Vision for Lululemon",
                "points": [
                    {
                        "title": "Founder's Long-Term Vision",
                        "points": []
                    },
                    {
                        "title": "Short-Term Vision of Investors",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Going Public",
                "points": [
                    {
                        "title": "Going Public in 2007",
                        "points": []
                    },
                    {
                        "title": "Hot Stock",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Selling Stock",
                "points": [
                    {
                        "title": "Selling 48% of Stock",
                        "points": []
                    },
                    {
                        "title": "Loss of Control of Board Seats",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Advice from Advisors",
                "points": [
                    {
                        "title": "Advice to Sell More Shares",
                        "points": []
                    },
                    {
                        "title": "Techniques to Dissipate Founder's Power",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Company's Success",
                "points": [
                    {
                        "title": "Rapid Growth in Early 2000s",
                        "points": []
                    },
                    {
                        "title": "Lululemon's Widespread Popularity",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Lululemon's Explosive Growth",
                "points": [
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
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Long-term Vision and Passion",
                "points": [
                    {
                        "title": "Family and Athletic Clothing",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "The Recall of Sheer Pants",
                "points": [
                    {
                        "title": "Controversial Statement",
                        "points": [
                            {
                                "title": "Pants Not Suitable for All Body Types",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Personal Spending Habits",
                "points": [
                    {
                        "title": "Frugal at Home, Not in Business",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Quality Issue with Lululemon Pants",
                "points": [
                    {
                        "title": "Pilling Problem",
                        "points": [
                            {
                                "title": "Caused by Friction",
                                "points": []
                            },
                            {
                                "title": "Exacerbated by Women Buying Smaller Sizes",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Misinterpretation of CEO's Statement",
                "points": [
                    {
                        "title": "CEO's Original Statement",
                        "points": [
                            {
                                "title": "Some Women's Bodies Not Suitable for Lululemon Pants",
                                "points": []
                            }
                        ]
                    },
                    {
                        "title": "Public Perception",
                        "points": [
                            {
                                "title": "Overweight Women Shouldn't Wear Lululemon Pants",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "CEO's Frustration with the Board",
                "points": [
                    {
                        "title": "Disagreement on Company Direction",
                        "points": []
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Depression and Liability",
                "points": [
                    {
                        "title": "Feeling of Depression",
                        "points": []
                    },
                    {
                        "title": "Removal as Chairman",
                        "points": [
                            {
                                "title": "Perceived as Liability",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Reflection on Past Mistakes",
                "points": [
                    {
                        "title": "Poor Choice of Words",
                        "points": []
                    },
                    {
                        "title": "Devastating Consequences",
                        "points": [
                            {
                                "title": "Impact on Family",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Building a Company",
                "points": [
                    {
                        "title": "Blood, Sweat, and Tears",
                        "points": []
                    },
                    {
                        "title": "Loss of Control",
                        "points": [
                            {
                                "title": "Success and Failure",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Future Plans",
                "points": [
                    {
                        "title": "No New Business Ventures",
                        "points": []
                    },
                    {
                        "title": "Current Interests",
                        "points": [
                            {
                                "title": "Coaching Flag Football",
                                "points": []
                            }
                        ]
                    }
                ]
            }
        },
        {
            "timestamp": 100,
            "keypoint": {
                "title": "Success and Luck",
                "points": [
                    {
                        "title": "Passion and Drive",
                        "points": []
                    },
                    {
                        "title": "Meeting Market Demand",
                        "points": []
                    }
                ]
            }
        }
      
]

// Recursive function to convert JSON object to markdown format
const transformToMarkdown = (data: NestedData, level = 0): string => {
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