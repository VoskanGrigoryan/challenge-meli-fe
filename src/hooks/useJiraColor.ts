export function useJiraColor() {
  const mapJiraColorToMantine = (jiraColor: string): string => {
    const colorMap: Record<string, string> = {
      "blue-gray": "blue",
      green: "green",
      yellow: "yellow",
      brown: "orange",
      "warm-red": "red",
      "medium-gray": "gray",
      blue: "blue",
      purple: "grape",
      red: "red",
      gray: "gray",
    };

    return colorMap[jiraColor] || "gray";
  };

  return { mapJiraColorToMantine };
}
