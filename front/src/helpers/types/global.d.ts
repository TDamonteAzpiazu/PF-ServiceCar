
interface Window {
  voiceflow: {
    chat: {
      load: (config: {
        verify: { projectID: string };
        url: string;
        versionID: string;
      }) => void;
    };
  };
}


