import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Set "mo:core/Set";
import Order "mo:core/Order";
import Iter "mo:core/Iter";

actor {
  type ProjectType = {
    website : Bool;
    mobileApp : Bool;
    aiIntegration : Bool;
    ecommerce : Bool;
    automation : Bool;
  };

  module ProjectType {
    public func compare(project1 : ProjectType, project2 : ProjectType) : Order.Order {
      let p1Features = ProjectType.featuresArray(project1).toText();
      let p2Features = ProjectType.featuresArray(project2).toText();
      Text.compare(p1Features, p2Features);
    };

    public func featuresArray(project : ProjectType) : [Bool] {
      [project.website, project.mobileApp, project.aiIntegration, project.ecommerce, project.automation];
    };
  };

  type Estimate = {
    projectType : ProjectType;
    estimatedCost : Nat;
  };

  module Estimate {
    public func compare(estimate1 : Estimate, estimate2 : Estimate) : Order.Order {
      switch (Nat.compare(estimate1.estimatedCost, estimate2.estimatedCost)) {
        case (#equal) { ProjectType.compare(estimate1.projectType, estimate2.projectType) };
        case (order) { order };
      };
    };
  };

  type ProjectId = Nat;

  let projects = Map.empty<ProjectId, ProjectType>();
  let estimates = Map.empty<ProjectId, Estimate>();

  func calcEstimate(project : ProjectType) : Nat {
    var cost = 0;
    if (project.website) { cost += 2000 };
    if (project.mobileApp) { cost += 3000 };
    if (project.aiIntegration) { cost += 3500 };
    if (project.ecommerce) { cost += 9000 };
    if (project.automation) { cost += 4000 };
    cost;
  };

  func validateProject(project : ProjectType) {
    if (not (project.website or project.mobileApp)) {
      Runtime.trap("At least one primary feature (website or mobileApp) must be selected.");
    };
  };

  public shared ({ caller }) func estimateProject(project : ProjectType) : async Nat {
    validateProject(project);
    calcEstimate(project);
  };

  public shared ({ caller }) func createProjectType(website : Bool, mobileApp : Bool, aiIntegration : Bool, ecommerce : Bool, automation : Bool) : async Nat {
    let newProject : ProjectType = {
      website;
      mobileApp;
      aiIntegration;
      ecommerce;
      automation;
    };
    validateProject(newProject);
    let newId = projects.size() + 1;
    projects.add(newId, newProject);

    let estimatedCost = calcEstimate(newProject);
    let newEstimate : Estimate = {
      projectType = newProject;
      estimatedCost;
    };
    estimates.add(newId, newEstimate);

    newId;
  };

  public query ({ caller }) func getProjectType(id : ProjectId) : async ProjectType {
    switch (projects.get(id)) {
      case (null) { Runtime.trap("Project not found") };
      case (?project) { project };
    };
  };

  public query ({ caller }) func getEstimate(id : ProjectId) : async Estimate {
    switch (estimates.get(id)) {
      case (null) { Runtime.trap("Estimate not found") };
      case (?estimate) { estimate };
    };
  };

  public query ({ caller }) func getAllProjectTypes() : async [ProjectType] {
    let projectTypes = Set.empty<ProjectType>();
    for (project in projects.values()) {
      projectTypes.add(project);
    };
    projectTypes.values().toArray();
  };

  public query ({ caller }) func getAllEstimates() : async [Estimate] {
    estimates.values().toArray().sort();
  };

  public shared ({ caller }) func updateProjectType(id : ProjectId, website : Bool, mobileApp : Bool, aiIntegration : Bool, ecommerce : Bool, automation : Bool) : async Bool {
    let project : ProjectType = {
      website;
      mobileApp;
      aiIntegration;
      ecommerce;
      automation;
    };
    validateProject(project);
    if (not projects.containsKey(id)) {
      Runtime.trap("Project not found");
    };

    projects.add(id, project);

    let estimatedCost = calcEstimate(project);
    let newEstimate : Estimate = {
      projectType = project;
      estimatedCost;
    };
    estimates.add(id, newEstimate);

    true;
  };
};
