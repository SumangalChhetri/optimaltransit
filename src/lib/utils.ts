// utils.ts

// Function to format dates to a readable string
export function formatDate(date: string) {
    return new Date(date).toLocaleDateString();
}

// Function to conditionally join class names
export function cn(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}

// Add other utility functions as needed
