package dev.jake.workouttracker.entity.http.request;

import java.util.List;

public record CreateLiftWorkoutRequest(
        List<LiftDto> lifts
) {}
