
export type DetectionResult = {
  isAI: boolean;
  confidence: number;
  reasoning: string;
  artifacts: Artifact[];
  metadata: {
    dimensions?: string;
    fileSize?: string;
    mimeType: string;
  };
};

export type Artifact = {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
};

export type ScanHistoryItem = {
  id: string;
  timestamp: number;
  fileName: string;
  previewUrl: string;
  result: DetectionResult;
};

export interface GeminiAnalysisResponse {
  is_ai_generated: boolean;
  confidence_score: number;
  reasoning_summary: string;
  detected_artifacts: {
    label: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }[];
}
