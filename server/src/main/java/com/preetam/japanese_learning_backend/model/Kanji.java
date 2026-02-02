package com.preetam.japanese_learning_backend.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "kanjis")
public class Kanji {

    @Id
    private String id;

    private Integer freq_mainichi_shinbun;
    private Integer grade;
    private String heisig_en;
    private Integer jlpt;
    private String kanji;

    private List<String> kun_readings;
    private List<String> meanings;
    private List<String> name_readings;
    private List<String> notes;
    private List<String> on_readings;

    private Integer stroke_count;
    private String unicode;

    // gettters

    public String getId() { return id; }
    public Integer getFreq_mainichi_shinbun() { return freq_mainichi_shinbun; }
    public Integer getGrade() { return grade; }
    public String getHeisig_en() { return heisig_en; }
    public Integer getJlpt() { return jlpt; }
    public String getKanji() { return kanji; }
    public List<String> getKun_readings() { return kun_readings; }
    public List<String> getMeanings() { return meanings; }
    public List<String> getName_readings() { return name_readings; }
    public List<String> getNotes() { return notes; }
    public List<String> getOn_readings() { return on_readings; }
    public Integer getStroke_count() { return stroke_count; }
    public String getUnicode() { return unicode; }
}