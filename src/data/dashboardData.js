export const initialDashboardData = {
  categories: [
    {
      id: "cspm",
      title: "CSPM Executive Dashboard",
      tabLabel: "CSPM",
      widgets: [
        {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          type: "donut",
          total: 2,
          centerLabel: "Total",
          data: [
            { name: "Connected", value: 2, color: "#3b82f6" },
            { name: "Not Connected", value: 2, color: "#bfdbfe" }
          ]
        },
        {
          id: "cloud-risk-assessment",
          name: "Cloud Account Risk Assessment",
          type: "donut",
          total: 9659,
          centerLabel: "Total",
          data: [
            { name: "Failed", value: 1689, color: "#dc2626" },
            { name: "Warning", value: 681, color: "#facc15" },
            { name: "Not available", value: 36, color: "#cbd5e1" },
            { name: "Passed", value: 7253, color: "#16a34a" }
          ]
        }
      ]
    },
    {
      id: "cwpp",
      title: "CWPP Dashboard:",
      tabLabel: "CWPP",
      widgets: [
        {
          id: "namespace-alerts",
          name: "Top 5 Namespace Specific Alerts",
          type: "empty",
          text: "No Graph data available!"
        },
        {
          id: "workload-alerts",
          name: "Workload Alerts",
          type: "empty",
          text: "No Graph data available!"
        }
      ]
    },
    {
      id: "registry-scan",
      title: "Registry Scan",
      tabLabel: "Image",
      widgets: [
        {
          id: "image-risk-assessment",
          name: "Image Risk Assessment",
          type: "progress-bar",
          subtitle: "1470 Total Vulnerabilities",
          segments: [
            { name: "Critical", value: 9, color: "#dc2626" },
            { name: "High", value: 150, color: "#f97316" },
            { name: "Medium", value: 450, color: "#facc15" },
            { name: "Low", value: 861, color: "#cbd5e1" }
          ]
        },
        {
          id: "image-security-issues",
          name: "Image Security Issues",
          type: "progress-bar",
          subtitle: "2 Total Images",
          segments: [
            { name: "Critical", value: 2, color: "#dc2626" },
            { name: "High", value: 2, color: "#f97316" },
            { name: "Medium", value: 1, color: "#facc15" },
            { name: "Low", value: 0, color: "#cbd5e1" }
          ]
        }
      ]
    },
    {
      id: "ticket",
      title: "Ticket Dashboard",
      tabLabel: "Ticket",
      widgets: [
        {
          id: "support-tickets",
          name: "Active Support Tickets",
          type: "text",
          text: "All support queues are currently healthy. 0 critical tickets unresolved."
        }
      ]
    }
  ]
};

