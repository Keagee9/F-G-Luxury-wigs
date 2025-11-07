import { config } from 'dotenv';
config();

import '@/ai/flows/generate-wig-description.ts';
import '@/ai/flows/personalized-wig-recommendations.ts';
import '@/ai/flows/virtual-try-on-with-style-matching.ts';
import '@/ai/flows/virtual-wig-try-on.ts';