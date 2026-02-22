import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ProjectId = bigint;
export interface ProjectType {
    aiIntegration: boolean;
    website: boolean;
    automation: boolean;
    mobileApp: boolean;
    ecommerce: boolean;
}
export interface Estimate {
    projectType: ProjectType;
    estimatedCost: bigint;
}
export interface backendInterface {
    createProjectType(website: boolean, mobileApp: boolean, aiIntegration: boolean, ecommerce: boolean, automation: boolean): Promise<bigint>;
    estimateProject(project: ProjectType): Promise<bigint>;
    getAllEstimates(): Promise<Array<Estimate>>;
    getAllProjectTypes(): Promise<Array<ProjectType>>;
    getEstimate(id: ProjectId): Promise<Estimate>;
    getProjectType(id: ProjectId): Promise<ProjectType>;
    updateProjectType(id: ProjectId, website: boolean, mobileApp: boolean, aiIntegration: boolean, ecommerce: boolean, automation: boolean): Promise<boolean>;
}
