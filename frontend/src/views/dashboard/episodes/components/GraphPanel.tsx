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

        mm.setData(root);
        mm.fit();

    }, [refMm.current, value]);

    return (
            <React.Fragment>
                <svg className="flex-1" ref={refSvg} width='100%' height='500px'/>
            </React.Fragment>
        );
}
