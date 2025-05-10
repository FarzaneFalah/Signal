export interface FoodGroupInterface {
    fgid: string;
    foodgroup: string;
    fgcat_id: string;
    fgcat: string;
}

export interface DirectionalStatementInterface {
    fgid: string;
    directional_statement: string;
}

export interface FoodItemInterface {
    fgid: string;
    fgcat_id: string;
    srvg_sz: string;
    food: string;
}

export interface ServingRecommendationInterface {
    fgid: string;
    gender: string;
    ages: string;
    servings: string;
}

export interface FamilyMemberInterface {
    id: string;
    gender: string;
    ageRange: string;
}