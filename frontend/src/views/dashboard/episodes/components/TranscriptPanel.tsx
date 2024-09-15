// Chakra imports
import { useColorModeValue, VStack, Box } from '@chakra-ui/react';
// Custom components
import { useRef } from 'react';
import { SpeakerAvatar } from './SpeakerAvatar';
import Sentence from './Sentence';
import Timestamp from './Timestamp';
import { AudioPlayerComponent, AudioPlayerRef } from './AudioPlayerComponent';

const sentences=[
    {
        "start": 0.3998,
        "end": 15.89466,
        "transcript": [
            "As for today's show, Chip Wilson is definitely the kind of entrepreneur who is very attentive to trends.",
            "And when he was living in Vancouver in the late nineteen nineties, the trend he noticed was yoga.",
            "It seemed like everyone was getting into it.",
            "Particularly women."
        ],
        "speaker": 0
    },
    {
        "start": 16.27422,
        "end": 29.0081,
        "transcript": [
            "So the story of lululemon is a classic case of seeing an opportunity and just seizing on it.",
            "Right place, right time.",
            "But along the way, Chip also ran into some major problems, some of which he caused himself."
        ],
        "speaker": 0
    },
    {
        "start": 29.42764,
        "end": 31.85944,
        "transcript": [
            "It first ran in June of twenty eighteen."
        ],
        "speaker": 0
    },
    {
        "start": 32.31896,
        "end": 35.9374,
        "transcript": [
            "It's a super interesting story.",
            "Hope you enjoy it.",
            "Here it is."
        ],
        "speaker": 0
    },
    {
        "start": 39.31546,
        "end": 41.77448,
        "transcript": [
            "People were just naked in front of the store."
        ],
        "speaker": 0
    },
    {
        "start": 42.15404,
        "end": 56.77806,
        "transcript": [
            "We they showed up in their trench coats and, you know, we went out when we went went to open the store.",
            "I went out with my wife and put my arm around her and then we they always said thanks for coming and everyone dropped their trench coats and went running into the store."
        ],
        "speaker": 1
    },
    {
        "start": 64.2864,
        "end": 72.64378,
        "transcript": [
            "From NPR, it's how I built this, a show about innovators, entrepreneurs, idealists, and stories behind the movements they built."
        ],
        "speaker": 0
    },
    {
        "start": 75.46212,
        "end": 85.409676,
        "transcript": [
            "I'm Gayra's and on today's show how Chip Wilson turned workout clothes into a fashion statement and along the way built a breakout brand worth billions."
        ],
        "speaker": 0
    },
    {
        "start": 93.82522,
        "end": 110.84974,
        "transcript": [
            "So it used to be that the clothes you wore to gym were like the absolute worst clothes you owned.",
            "You know, the ratty old t shirt you got for free at some events, sweatpants with your high school logo, you know, the kind of short shorts doctor j would have won on basketball court."
        ],
        "speaker": 0
    },
    {
        "start": 111.26928,
        "end": 121.64434,
        "transcript": [
            "Anyway, most of this apparel was cotton based.",
            "It was baggy.",
            "It didn't look so great.",
            "And honestly, nobody really cared.",
            "You'd had one job to do, which was to sweat at the gym."
        ],
        "speaker": 0
    },
    {
        "start": 122.143845,
        "end": 143.58702,
        "transcript": [
            "But at some point, in the past ten or fifteen years, all of that changed because suddenly the clothes you wore to work out were also the clothes you could wear to the grocery store or at a restaurant or even at work work.",
            "So for better or worse, people were wearing their gym clothes outside of the gym on purpose."
        ],
        "speaker": 0
    },
    {
        "start": 144.04654,
        "end": 145.90587,
        "transcript": [
            "In this trend, it was called athleisure."
        ],
        "speaker": 0
    },
    {
        "start": 146.44534,
        "end": 149.14424,
        "transcript": [
            "And Chip Wilson, he was one of its pioneers."
        ],
        "speaker": 0
    },
    {
        "start": 149.68373,
        "end": 155.4335,
        "transcript": [
            "The brand he built out of his house in Vancouver Uber is now worth more than fourteen billion dollars."
        ],
        "speaker": 0
    },
    {
        "start": 156.21286,
        "end": 188.7418,
        "transcript": [
            "Now, before I go on, let me just address the elephant in the room.",
            "Chip has said some things that are well, how do I put this?",
            "Root and boorish?",
            "He's put his foot in his mouth on several occasions.",
            "He's embarrassed the company.",
            "And you will hear about some of that later on in the show.",
            "But he's also an open book and open to getting grilled all about his life.",
            "He's not a cautious, media trained, sound bites guy, which is in part, what makes him interesting?",
            "Because that's sort of how Chip grew up without any protection."
        ],
        "speaker": 0
    },
    {
        "start": 189.40121,
        "end": 200.00763,
        "transcript": [
            "Middle class kid in Calgary, Canada, Chip was athletic.",
            "He played hockey and football call, his dad taught Fiz Ed at the local high school, and his mom was a seamstress."
        ],
        "speaker": 0
    },
    {
        "start": 201.06685,
        "end": 204.12558,
        "transcript": [
            "She lived for it.",
            "It's where total passion was."
        ],
        "speaker": 1
    },
    {
        "start": 204.46515,
        "end": 214.69234,
        "transcript": [
            "She tried to make clothing for the kids, but of course, we didn't we'd never liked what she made for us.",
            "But, you know, if I want to spend time with my mom, it had to be at her foot in the sewing room."
        ],
        "speaker": 1
    },
    {
        "start": 215.83151,
        "end": 244.69293,
        "transcript": [
            "So did you learn how to sew, like, from an early age?",
            "Yeah.",
            "I can definitely sew.",
            "But more so, I think it was working with the butterric patterns and watching my mom lay them down on the fabric and then and then how she moved them and twisted them in order to save fabric.",
            "And I only say how important that is because once I got into big production and you'd lay fifty to a hundred layers of fabric down, when you can save even five, six, seven inches of fabric, it can mean thousands of dollars."
        ],
        "speaker": 1
    },
    {
        "start": 245.03252,
        "end": 260.82785,
        "transcript": [
            "Now before Chip would go on to sew and design clothes for a living, he actually got his first real job at an oil company, working a grueling but incredibly a lucrative job on the Alaska oil pipeline for almost two years."
        ],
        "speaker": 0
    },
    {
        "start": 261.48727,
        "end": 274.8326,
        "transcript": [
            "How much did you walk away with?",
            "How much cash?",
            "Well, interesting in today's dollar, it's probably about six hundred thousand and walked you back then.",
            "It was about a hundred seventy five thousand American.",
            "Yeah.",
            "That was It was amazing.",
            "Amazing.",
            "You were, like, nineteen."
        ],
        "speaker": 1
    },
    {
        "start": 275.65195,
        "end": 281.90906,
        "transcript": [
            "You were just given this cash, and and that's simply because there was all of this money to work on the Alaska oil pipeline, I guess."
        ],
        "speaker": 0
    },
    {
        "start": 282.3286,
        "end": 296.745,
        "transcript": [
            "Right.",
            "And, you know, but I, you know, I traded my life in for money.",
            "I mean, there was no girls.",
            "There was, you know, nothing there except for, you know, you work.",
            "So I I also wonder, you know, if everyone got that opportunity, would they have made the same thing out of it?",
            "I did."
        ],
        "speaker": 1
    },
    {
        "start": 297.38467,
        "end": 300.56332,
        "transcript": [
            "It's pretty good.",
            "You're eighteen or nineteen or twenty"
        ],
        "speaker": 0
    },
    {
        "start": 300.90292,
        "end": 309.71875,
        "transcript": [
            "with a bunch of cash.",
            "So what did you what did you do with the money?",
            "Well, I'd almost had three goals in Alaska.",
            "One of them was stolen my own house by the age of twenty."
        ],
        "speaker": 1
    },
    {
        "start": 310.6996,
        "end": 326.413,
        "transcript": [
            "To be in my own business by the age of thirty and retired by forty and retirement meaning that I was doing exactly what I wanted to do.",
            "So so I did, I bought a house",
            "and then I finished up my degree, and I worked for an oil company.",
            "And and this is an oil company"
        ],
        "speaker": 1
    },
    {
        "start": 327.31232,
        "end": 338.13876,
        "transcript": [
            "back in in Calgary.",
            "Right?",
            "Because you you moved back there somewhere.",
            "Right.",
            "Right.",
            "And I guess in, like, the late seventies.",
            "Right?",
            "Pretty much around the time you graduate college or Yeah."
        ],
        "speaker": 0
    },
    {
        "start": 339.118,
        "end": 343.89587,
        "transcript": [
            "You start to make shorts, like baggy shorts for men?"
        ],
        "speaker": 0
    },
    {
        "start": 344.43536,
        "end": 369.0874,
        "transcript": [
            "Yeah.",
            "Because I didn't you know, I have to get what it was like at that time men wore very short shorts that were very very tight.",
            "And, you know, you only have to look at movies from the Sure.",
            "From the least that we have to get that kind of picture.",
            "And and they made a lot of sense to me because I had very big legs and I was I think because I was working out three times a day, I was all in a constant sweat."
        ],
        "speaker": 1
    },
    {
        "start": 369.46698,
        "end": 409.45276,
        "transcript": [
            "And the idea of wearing shorts full time was very appealing to me.",
            "Yeah.",
            "And and so you and and these were, like, flower printed, like, loud Hawaiian.",
            "Like, I don't know if you've been to Trader Joe's, like, those shirts.",
            "Like, that's what the shorts look like.",
            "Yeah.",
            "Exactly.",
            "But, you know, he had to see it in a context that there was nothing like that before everything else was that era of brown rust, off color okra, yellow, like solid colors.",
            "There was no brightness in the world at all that time.",
            "So that was a radical look.",
            "So I I started because I couldn't get loud floured prints in two thousand meters, which is kind of what a person needs to go into business."
        ],
        "speaker": 1
    },
    {
        "start": 409.83234,
        "end": 458.30417,
        "transcript": [
            "I started doing what my mom did.",
            "She quilted fabric.",
            "So I would get masses of different types of patterns of fabric, and then I would cut them into squares, and then I would quilt them.",
            "And then in order to keep the stability of that, I put up backing on it, a black fabric, and then I realized I had reversible shorts.",
            "So, normally, were they long and baggy and reversible?",
            "They just really revolutionized shorts.",
            "So and then the skateboarders started taking them on because it kinda covered their knees.",
            "Well, how did they even know about them?",
            "Did you start to sell them somewhere?",
            "Well, I mean, that's the invention of a a fruit retailing because I made about three hundred pairs of the shorts up in nineteen eighty, and I went to the big department stores here in Canada, and they would have nothing to do with them.",
            "So I had my first inventory problem."
        ],
        "speaker": 1
    },
    {
        "start": 458.7237,
        "end": 467.47208,
        "transcript": [
            "So I thought, well, what am I gonna do?",
            "So I basically set up a lemonade stand for the shorts and Where in in Calgary?",
            "In the downtown mall in Calgary."
        ],
        "speaker": 1
    },
    {
        "start": 468.3714,
        "end": 543.0338,
        "transcript": [
            "And I had a partner girlfriend at the time, and so we did that together.",
            "And you know, we, you know, we'd lay all these shorts out and then a day we'd make, like, a thousand dollars a day selling the shorts and I was making, like, a hundred and twenty dollars at the oil company.",
            "So it wasn't tough to figure out the math of that.",
            "And what these were not swimming shorts.",
            "These are like, what like, who would wear these shorts?",
            "What would you be doing while wearing these shorts?",
            "Well, these particular shorts, you know, I couldn't release it was tough in the oil business of conservative Calgary where people wear Prada suits and cowboy boots to sell them on loud, baggy shorts.",
            "And so I originally called them barbecue shorts because I needed to give men needed an excuse to wear them.",
            "I knew they wanted to wear them.",
            "But as you know, a couple years went on.",
            "And that's, again, that's when the skateboarding market took over from the surf market and the young boys, you know, like, ten to eighteen started wearing them.",
            "So this is this is nineteen eighty.",
            "You've got barbecue shorts.",
            "By the way, the barbecue season in Calgary has to be fairly short like a couple weeks.",
            "Yeah.",
            "Yeah.",
            "I got forty days now.",
            "Forty days.",
            "You got forty days to wear these shorts in Calgary.",
            "I mean, not a brilliant"
        ],
        "speaker": 1
    },
    {
        "start": 543.4134,
        "end": 556.6896,
        "transcript": [
            "marketing move, but it worked.",
            "People were Alright.",
            "Barbecue.",
            "And so nineteen eighty, and then but at the",
            "it's it's the same time you were still working for this oil company on the side or or you were doing this on the side.",
            "You weren't working for and how long before you quit the oil company?"
        ],
        "speaker": 0
    },
    {
        "start": 557.41,
        "end": 566.6656,
        "transcript": [
            "Well, I had my goal of quitting being in my own business by thirty, so I worked for an old company for five years and quit on my birthday.",
            "Your 30th birthday.",
            "Exactly."
        ],
        "speaker": 1
    },
    {
        "start": 568.3245,
        "end": 573.94403,
        "transcript": [
            "Did you create a brand around around the barbecue shorts?",
            "Yeah.",
            "I I called it West Beach,"
        ],
        "speaker": 0
    },
    {
        "start": 574.3636,
        "end": 600.40497,
        "transcript": [
            "which at the time was I think it's probably from being in San Diego when I was young and",
            "probably the the incredible feeling I had from living on the beach every day when you were a little kid.",
            "Yeah.",
            "When I was a little kid and I being in Calgary, I was wanting to get back to the beach, I was wanting to get back to the West Coast.",
            "I think that's where I felt best.",
            "So that was the brand I built up around it.",
            "And who and and so initially your customers were in Calgary, but how did you get the word out around"
        ],
        "speaker": 1
    },
    {
        "start": 600.8245,
        "end": 602.00415,
        "transcript": [
            "Canada and beyond?"
        ],
        "speaker": 0
    },
    {
        "start": 602.6236,
        "end": 620.0274,
        "transcript": [
            "Well, I went to Canada was pretty easy because, you know, that I got into it almost a decade before anybody else, I think.",
            "But and so I could slowly kind of move across like that.",
            "We opened up the store in Toronto, but then I went to a trade show in Singapore and then another one in Munich."
        ],
        "speaker": 1
    },
    {
        "start": 620.48694,
        "end": 639.06,
        "transcript": [
            "And so, you know, when a person kind of comes out with something that's so different like that, that, you know, there's a lot of interest in",
            "And then I had this sense looking five years in the future that the skateboarding and surf markets were gonna be huge.",
            "And and by the"
        ],
        "speaker": 1
    },
    {
        "start": 639.5595,
        "end": 643.5378,
        "transcript": [
            "sort of that time, the mid to late eighties, what were you selling?"
        ],
        "speaker": 0
    },
    {
        "start": 644.5299,
        "end": 651.7466,
        "transcript": [
            "Well, I mean, the beautiful thing is I when I formed a partnership with my two guys in Vancouver, I moved to Vancouver."
        ],
        "speaker": 1
    },
    {
        "start": 652.68585,
        "end": 684.3439,
        "transcript": [
            "And then in I'd say eighty but starting in eighty three in Calgary, I'd asserted it to do snowboarding.",
            "And I could see snowboarding coming.",
            "And snowboarding was gonna be way bigger than a surfer skate.",
            "And I didn't care about the boards and the boots and the bunnies because for me that was low margin hard goods where I knew all the money was to be made in the clothing, especially for us because it would take up the other eight months of the year, which we weren't really selling very much.",
            "And snowboard clothing was four or five times the price of"
        ],
        "speaker": 1
    },
    {
        "start": 684.7049,
        "end": 690.28235,
        "transcript": [
            "surfacegate t shirts and shorts.",
            "And who was designing the apparel that West Beach was selling?"
        ],
        "speaker": 0
    },
    {
        "start": 690.7419,
        "end": 727.87946,
        "transcript": [
            "Well, I was.",
            "That was my thing.",
            "And I you know, if I look back at it now, I mean, I never had any money for clothing when I was young.",
            "I probably had a genetic desire for, you know, kind of ideas that I had.",
            "I think part of it was, you know, my size and I think part of it was I wanted athletic clothing that actually fit me.",
            "So I think that was driven to both those?",
            "Where are you making the stuff, by the way?",
            "Where's the clothing being made at that point?",
            "Well, I'm making it in Calgary.",
            "I found some Italian couture designers that were, you know, again, just like my mother, they were at home and they weren't working in.",
            "They were amazing."
        ],
        "speaker": 1
    },
    {
        "start": 728.5389,
        "end": 730.0384,
        "transcript": [
            "So we set up a factory."
        ],
        "speaker": 1
    },
    {
        "start": 731.2575,
        "end": 748.2822,
        "transcript": [
            "And so if you can imagine almost everybody else in the apparel industry, I think everybody else basically made clothing then wholesaled it to somebody else.",
            "Right.",
            "Not only was I doing my own menu fracturing, but I own my own stores.",
            "So I was basically taking the profit of two middlemen out of the business."
        ],
        "speaker": 1
    },
    {
        "start": 748.62177,
        "end": 778.1713,
        "transcript": [
            "But, you know, the big revenue part of the business was in wholesale, but my wholesale business was losing a million dollars a year and then I had these two retail stores that were making a million dollars a year.",
            "Wait.",
            "Wait.",
            "Explain explain this to me because you have these retail stores and and they were doing well, but you you also had a wholesale business which was losing money.",
            "Well, it was a quandary because I needed the volume from wholesale to get to economy and scale production to bring my prices down."
        ],
        "speaker": 1
    },
    {
        "start": 778.5909,
        "end": 796.6737,
        "transcript": [
            "And because my prices were down, my retail stores could make so much money but I couldn't really make any money in wholesale because if I made something for twenty dollars, then I would have to sell it to Dick's Sporting Goods for forty, and then they would sell it for eighty."
        ],
        "speaker": 1
    },
    {
        "start": 797.05493,
        "end": 814.6181,
        "transcript": [
            "We're in my own real estate stores and I was putting it in there for twenty and making eighty dollars.",
            "So there was a sixty dollar profit in there.",
            "And so I kept thinking to myself how can I get to economy of scale production and that was the, you know, the the big, big driver?",
            "And were you"
        ],
        "speaker": 1
    },
    {
        "start": 815.2578,
        "end": 822.1946,
        "transcript": [
            "were I mean, what was your vision?",
            "Did you think this is gonna we're gonna take on we're gonna be the biggest snowboard apparel company in the world?"
        ],
        "speaker": 0
    },
    {
        "start": 823.12494,
        "end": 829.82184,
        "transcript": [
            "Sure.",
            "I mean, in Japan had just exploded.",
            "So it was about thirty percent of all stores business."
        ],
        "speaker": 1
    },
    {
        "start": 830.4413,
        "end": 859.96924,
        "transcript": [
            "And the drive to grow and to grow fast knowing that what I'd seen in surf and skate where it started off with three companies, went to five hundred, and then went down to three again.",
            "I knew the same thing was how gonna happen in snowboarding.",
            "So when's the right time to get in?",
            "What's the right time to build?",
            "What's the right time to invest?",
            "And when to get out?",
            "What's all in the back of my mind?",
            "Mhmm.",
            "And sure enough, you know, probably in ninety six or so, the Japanese, he inserted the collapse."
        ],
        "speaker": 1
    },
    {
        "start": 860.2999,
        "end": 874.15326,
        "transcript": [
            "So we're starting to think that snowboarding wasn't the cool thing to do anymore.",
            "Mhmm.",
            "And so the market was changing drastically, and we still weren't making any money because we were just reinvesting just to keep on top of the competition."
        ],
        "speaker": 1
    },
    {
        "start": 874.7149,
        "end": 876.2944,
        "transcript": [
            "So you decide to sell?"
        ],
        "speaker": 0
    },
    {
        "start": 876.9938,
        "end": 878.05347,
        "transcript": [
            "Well, yes."
        ],
        "speaker": 1
    },
    {
        "start": 878.553,
        "end": 883.57074,
        "transcript": [
            "We and we sold to a public company out of Salem, Morril Snowboards."
        ],
        "speaker": 1
    },
    {
        "start": 884.3901,
        "end": 896.18555,
        "transcript": [
            "And, you know, we quite honestly could not make payroll on Friday and we sold Wednesday based on brand value only.",
            "Wow.",
            "You probably walked away with a good chunk of cash."
        ],
        "speaker": 1
    },
    {
        "start": 896.9649,
        "end": 922.8855,
        "transcript": [
            "Well, I had partners and I had banks and I had private equity in there at that time.",
            "Mhmm.",
            "So I walked away with a million and after tax, eight hundred thousand.",
            "And then you've got a you know, I had paid myself probably thirty to forty thousand dollars for eighteen years.",
            "Away?",
            "No.",
            "Well, yeah.",
            "You didn't walk with a whole lot.",
            "No.",
            "I needed a car, and I need to buy a house of some sort, which was the best thing I ever did living in Vancouver."
        ],
        "speaker": 1
    },
    {
        "start": 923.6249,
        "end": 934.6511,
        "transcript": [
            "Okay.",
            "So okay.",
            "So here you are in your early forties and and, like I mean, what were you gonna do?",
            "Well, actually, my goal was to be financially independent by forties.",
            "So I failed in that goal."
        ],
        "speaker": 0
    },
    {
        "start": 934.9907,
        "end": 971.56836,
        "transcript": [
            "And, you know, I was thinking about what I wanted to do, and and then I and I had this thing I have all split in this three times things.",
            "And I see something three times and I move",
            "and I move really quickly.",
            "Mhmm.",
            "So I've seen I've seen an article in the paper about yoga.",
            "I've seen a poster on a, you know, telephone post with a little rip off about the yoga class and then I overheard a conversation in a coffee shop about yoga and I went, wow.",
            "So I I went to this yoga class.",
            "And I I went from about six to thirty people in thirty days.",
            "I was the only guy in the class."
        ],
        "speaker": 1
    },
    {
        "start": 972.2278,
        "end": 987.5529,
        "transcript": [
            "And it's in a gym and, you know, of course, I'm always noticing athletic bodies and clothing and how it fits.",
            "I mean, I'm really a big data guy around, you know, I look at everybody top to bottom and I analyze it."
        ],
        "speaker": 1
    },
    {
        "start": 988.09235,
        "end": 993.4828,
        "transcript": [
            "And at the time, the fashion of gyms was to wear your very worst clothing."
        ],
        "speaker": 1
    },
    {
        "start": 994.0622,
        "end": 1009.4766,
        "transcript": [
            "And mostly because probably ninety percent of people in gyms were men and and, you you know, you knew you were gonna wet in it, you were gonna get ugly in it, and you just wanted to throw it in the wash afterwards, so nobody thought about athletic clothing being nice."
        ],
        "speaker": 1
    },
    {
        "start": 1010.0161,
        "end": 1032.57,
        "transcript": [
            "So so just to get inside your head here, you're in the yoga class, and you are observing what everyone's wearing you must have been thinking already.",
            "I have a business idea.",
            "When did you start to add two and two and say, wait a minute, I can make this this type of clothing like, how do you go from one yoga class to that thought?",
            "Was it instant?",
            "Did it take a week?",
            "Did it take a month?"
        ],
        "speaker": 0
    }
]

export default function TranscriptPanel(props: { transcripts: any; onSeek: (seconds: number) => void }) {
	// Chakra Color Mode
    const { transcripts, onSeek } = props;
    const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'brand.400');
	const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
    let previousSpeaker: number = null;

	return (
		<Box 
            pt={{ base: '10px', md: '20px', xl: '10px' }} 
            // px='48'
            >
			<VStack spacing='10px' alignItems='start' w='2xl' m='auto'>
                {transcripts.utterances.map((sentence: { speaker: number; transcripts: string[]; start: number; }) => {
                    // Check if the speaker has changed
                    const isSpeakerChanged = sentence.speaker != previousSpeaker;

                    // Update previousSpeaker if it has changed
                    if (isSpeakerChanged) {
                        previousSpeaker = sentence.speaker;
                    }
                    return (
                        <>
                            {isSpeakerChanged && (
                                <>
                                    <SpeakerAvatar sentence={sentence} onSeek={onSeek}/>
                                    <Sentence transcript={sentence.transcripts} start={sentence.start} onSeek={onSeek}/>
                                </>
                            ) || (
                                <>
                                    <Timestamp seconds={sentence.start} onSeek={onSeek} />
                                    <Sentence transcript={sentence.transcripts} start={sentence.start} onSeek={onSeek}/>
                                </>
                            )} 
                        </>
                    );
                })}
            </VStack>
		</Box>
	);
}