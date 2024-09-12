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
type NestedData = {
    [key: string]: NestedData | null;
};

const jsonData: NestedData = {
    "Introduction": {
        "Busy weekend": {
            "Competitions": {
                "Olympics": {
                    "Closing ceremony": {
                        "Final events": null,
                        "High stakes": null
                    }
                }
            },
            "Global updates": {
                "Ukraine-Russia conflict": {
                    "Escalation": null,
                    "Strategic moves": null
                }
            }
        }
    },
    "Ukraine-Russia Conflict": {
            "Ukrainian Incursion": {
                "Cross-border attack": {
                    "Kursk region": {
                        "Village captures": {
                            "Russian defense issues": {
                                "Chaos on ground": null,
                                "Civilian evacuations": {
                                    "Social media reports": null,
                                    "Destruction images": null
                                }
                            }
                        }
                    }
                }
            },
        "Russian Response": {
            "Security meetings": {
                "Putin’s reaction": {
                    "Unhappy with progress": null,
                    "Calls for reinforcements": {
                        "Chaotic execution": null,
                        "Poor coordination": {
                            "Criticisms from bloggers": null,
                            "Public dissatisfaction": null
                        }
                    }
                }
            }
        },
        "Ukrainian Strategy": {
            "Psychological impact": {
                "Boost Ukrainian morale": {
                    "National pride increase": null,
                    "Put Russia on defense": {
                        "Create buffer zone": {
                            "Secure strategic areas": null,
                            "Prevent future attacks": {
                                "Holding challenges": null,
                                "Risk of counterattack": null
                            }
                        }
                    }
                }
            }
        }
    },
    "Ukrainian Strategy": {
        "Psychological impact": {
            "Boost Ukrainian morale": {
                "National pride increase": null,
                "Put Russia on defense": {
                    "Create buffer zone": {
                        "Secure strategic areas": null,
                        "Prevent future attacks": {
                            "Holding challenges": null,
                            "Risk of counterattack": null
                        }
                    }
                }
            }
        }
    },
    "U.S. Political Campaigns": {
        "Harris-Walz Tour": {
          "Swing state focus": {
            "Voter engagement": {
              "Large crowds": {
                "High energy in Phoenix": null,
                "Detroit rally success": null
              }
            },
          }
        },
        "Policy Focus": {
          "Immigration policy": {
            "Border security": {
              "Pathway to citizenship": {
                "Harris’s approach": {
                  "Comparisons with Trump": {
                    "Voter perceptions": null,
                    "Policy differences": null
                  }
                }
              }
            }
          }
        },
        "Trump-Vance Campaign": {
          "Rally strategy": {
            "Focus on crowd sizes": null,
            "Emphasize military background": {
              "Vance’s service record": null,
              "Republican messaging": {
                "Voter appeal": null
              }
            }
          }
        }
      },
      "Olympic Games": {
        "Track and Field": {
          "Men’s relay issues": {
            "Disqualification": {
              "Baton handoff problems": {
                "Historical struggles": null,
                "Team disappointment": null
              }
            },
            "Women’s relay": {
              "Richardson’s performance": {
                "Dramatic comeback": null,
                "Securing gold": null
              }
            }
          }
        },
        "Weightlifting": {
          "Olivia Reeves": {
            "Gold medal win": {
              "Olympic record set": {
                "Historic moment": null,
                "First U.S. gold since 2000": null
              }
            }
          }
        },
        "Boxing Controversy": {
          "Iman Khalif": {
            "Gender eligibility debate": {
              "IBA’s credibility questioned": {
                "Lack of transparency": null,
                "Deep ties to Russia": null
              }
            },
            "Khalif’s victory": {
              "Unanimous decision": {
                "Defiant statement": null,
                "Identity affirmation": null
              }
            }
          }
        }
      },
    "Closing": {
        "Credits": {
            "Production team acknowledgment": {
                "Editors and supervisors": null,
                "Next episode teaser": {
                    "Sex testing in sports": {
                    "Historical context": null,
                    "Modern implications": null
                    }
                }
            }
        }
    },
    "Walz’s introduction": {
              "Educational background": {
                "Teacher and coach": null
              },
              "Enthusiastic partner to Harris": {
                "Positive public reception": null,
                "Rising national profile": {
                  "Increased scrutiny": {
                    "Military record debate": null,
                    "Republican attacks": null
                  }
                }
              }
            }
}

// Recursive function to convert JSON object to markdown format
const transformToMarkdown = (data: NestedData, level = 0): string => {
    const indentation = '    '.repeat(level); // Add indentation based on depth
    let result = '';
  
    for (const key in data) {
      result += `${indentation}- ${key}\n`; // Add key with indentation and markdown bullet
  
      if (data[key] && typeof data[key] === 'object') {
        result += transformToMarkdown(data[key] as NestedData, level + 1); // Recursively add children
      }
    }
  
    return result;
  };
  
  // Transform the JSON data to markdown format
  const transformedMarkdown = `# Podcast Notes\n\n${transformToMarkdown(jsonData)}`;
  
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
