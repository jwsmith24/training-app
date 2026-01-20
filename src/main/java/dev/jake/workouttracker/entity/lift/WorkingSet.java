package dev.jake.workouttracker.entity.lift;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class WorkingSet {

    @Id
    private Long id;

    private Integer reps;

    private Double weight;



}
