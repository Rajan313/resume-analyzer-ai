package com.rajan.resumeanalyzer.repository;

import com.rajan.resumeanalyzer.entity.Analysis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalysisRepository extends JpaRepository<Analysis, Long> {

}