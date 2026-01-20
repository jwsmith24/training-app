package dev.jake.workouttracker.entity.http.request;

import java.util.List;

public record LiftDto(
        String liftName,
        List<WorkingSetDto> workingSets
) {
}
