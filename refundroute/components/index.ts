/**
 * Barrel Export File
 * 
 * Centralized export point for all components.
 * Simplifies imports throughout the application.
 * 
 * Usage:
 * import { Header, Sidebar, Button, Card } from "@/components";
 * 
 * Instead of:
 * import Header from "@/components/layout/Header";
 * import Button from "@/components/ui/Button";
 */

// Layout Components
export { default as Header } from "./layout/Header";
export { default as Sidebar } from "./layout/Sidebar";
export { default as LayoutWrapper } from "./layout/LayoutWrapper";

// UI Components
export { default as Button } from "./ui/Button";
export { default as Card } from "./ui/Card";
