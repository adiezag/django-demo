def calculate_daily_macros(profile):
    """
    Calculate daily macro targets based on user profile.
    Returns dict with calories, protein, carbs, fat.
    """
    # 1. Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor
    # Assuming male for now - you might want to add gender field
    if profile.gender == 'male':
        bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5
    else:  # female
        bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161
    # 2. Apply activity multiplier
    activity_multipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
    }
    tdee = bmr * activity_multipliers.get(profile.activity_level, 1.2)
    
    # 3. Adjust for goal
    if profile.goal == 'lose':
        target_calories = tdee - 500  # 500 cal deficit
    elif profile.goal == 'gain':
        target_calories = tdee + 300  # 300 cal surplus
    else:  # maintain
        target_calories = tdee
    
    # 4. Calculate macros (standard ratios)
    # Protein: 2g per kg body weight
    protein_grams = profile.weight * 2
    protein_calories = protein_grams * 4
    
    # Fat: 25% of calories
    fat_calories = target_calories * 0.25
    fat_grams = fat_calories / 9
    
    # Carbs: remaining calories
    carb_calories = target_calories - protein_calories - fat_calories
    carb_grams = carb_calories / 4
    
    return {
        'calories': round(target_calories),
        'protein': round(protein_grams),
        'carbs': round(carb_grams),
        'fat': round(fat_grams),
    }